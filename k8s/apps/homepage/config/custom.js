// Kubernetes status dot opens the tile's namespace in Headlamp's pods view instead of expanding pod stats.
// Capture on document runs before React's root listener, so stopping here blocks the toggle.
// custom.js isn't run through HOMEPAGE_VAR_ substitution, so borrow the tailnet host from the
// tile's own href (built from {{HOMEPAGE_VAR_TAILNET}} in services.yaml).

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
    const href = tile.querySelector("a[href]")?.href;
    const host = href ? new URL(href).hostname : location.hostname;
    const namespace = namespaces[tile.dataset.name];
    const view = namespace ? `pods?namespace=${encodeURIComponent(namespace)}` : "map?group=namespace";
    window.open(`http://${host}:30400/c/main/${view}`, "_blank", "noopener");
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
