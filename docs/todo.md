# TODO

- Fill out homepage
- Migrate services
- Fill out per-app docs
- Fill out runbook recovery docs
- Fill out technologies docs
- Finish daily games bot setup with bot creation
- Add VGMDJ setup with symphonium and macros

## Homepage

- The goal is being clean first and statful second
- Pretty background
- Metrics
    - CPU, RAM, storage, and network ("glances")
    - Uptime and max cpu temp
    - Maybe processes (don't know how useful this'd be)
    - Open Meteo weather and date & time
- Tiles
    - For each app / infra, even the ones without a gui
        - Links to open the apps that have guis
    - Obvious indicators only for the services with degraded performance
    - Supported metrics
        - Filebrowser
        - Immich
        - Jellyfin
    - Unsupported but desired metrics
        - Restic rest server
            - Last update
        - Headlamp
            - Number of events
        - Flux/kustomize
            - How many commits behind from source
            - Button to force synchronize without waiting
- Button to open github repo of this project plus any "personal" apps
