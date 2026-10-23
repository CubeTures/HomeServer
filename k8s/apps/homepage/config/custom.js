// Kubernetes status dot opens the tile's namespace in Headlamp's pods view instead of expanding pod stats.
// Capture on document runs before React's root listener, so stopping here blocks the toggle.
// custom.js isn't run through HOMEPAGE_VAR_ substitution, so borrow Headlamp's origin from its own
// tile's href (built from {{HOMEPAGE_VAR_TAILNET}} in services.yaml). Other tiles' hrefs can point
// off the tailnet (public domain, vendor dashboards), so they can't supply the host.

// Prefetched so window.open stays synchronous with the click (async opens get popup-blocked)
const namespaces = {};
fetch("/api/services")
  .then((res) => res.json())
  .then((groups) =>
    groups.forEach((group) =>
      group.services.forEach((service) => {
        if (service.namespace) namespaces[service.name] = service.namespace;
      }),
    ),
  );

document.addEventListener(
  "click",
  (event) => {
    const status = event.target.closest(".service-app");
    if (!status) return;
    event.preventDefault();
    event.stopPropagation();
    const tile = status.closest(".service");
    const headlamp = document.querySelector('.service[data-name="Headlamp"] a[href]')?.href;
    const origin = headlamp ? new URL(headlamp).origin : `http://${location.hostname}:30400`;
    const namespace = namespaces[tile.dataset.name];
    const view = namespace ? `pods?namespace=${encodeURIComponent(namespace)}` : "map?group=namespace";
    window.open(`${origin}/c/main/${view}`, "_blank", "noopener");
  },
  true,
);

// Bookmarks show as bare icons in the footer row, opposite the refresh button. #bookmarks and
// the footer are React's, so copy the rendered links into a container of our own rather than
// moving nodes React still tracks; the observer re-syncs if either side re-renders.
const syncBookmarks = () => {
  const style = document.getElementById("style");
  const links = document.querySelectorAll("#bookmarks .bookmark a");
  if (!style || !links.length) return;
  let container = document.getElementById("footer-bookmarks");
  if (!container) {
    container = document.createElement("div");
    container.id = "footer-bookmarks";
    style.prepend(container);
  }
  const html = Array.from(links, (link) => link.outerHTML).join("");
  if (container.dataset.html === html) return;
  container.dataset.html = html;
  container.innerHTML = html;
};

new MutationObserver(syncBookmarks).observe(document.body, { childList: true, subtree: true });
syncBookmarks();

// Glances stats render as ring gauges (custom.css). The widget only exposes its percentage as the
// usage bar's inline width, so copy that onto the resource as --pct, and split the value text
// ("364 MiB") into data attributes so the unit can be styled apart from the number. Both are
// attributes React doesn't own; writes are skipped when unchanged so the observer doesn't loop.
const syncGlances = () => {
  document.querySelectorAll(".information-widget-glances .information-widget-resource").forEach((resource) => {
    const pct = String(parseFloat(resource.querySelector(".resource-usage > div")?.style.width) || 0);
    if (resource.style.getPropertyValue("--pct") !== pct) resource.style.setProperty("--pct", pct);
    const level = Number(pct) >= 85 ? "high" : "";
    if (resource.dataset.level !== level) resource.dataset.level = level;

    const value = resource.querySelector(".resource-value");
    if (!value) return;
    const [, num, unit] = value.textContent.trim().match(/^([\d.,]*)\s*(.*)$/);
    if (value.dataset.num !== num) value.dataset.num = num;
    if (value.dataset.unit !== unit) value.dataset.unit = unit;
  });
};

new MutationObserver(syncGlances).observe(document.body, {
  childList: true,
  subtree: true,
  characterData: true,
  attributes: true,
  attributeFilter: ["style"],
});
syncGlances();
