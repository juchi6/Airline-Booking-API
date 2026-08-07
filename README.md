# Movie Booking Backend

A Node.js/Express backend for a movie booking application, using MySQL via Sequelize. This project also doubles as a reusable scaffold for future Express + Sequelize APIs — see [Using this as a scaffold](#using-this-as-a-scaffold) at the bottom.

## Tech stack

- **Runtime:** Node.js (v22.x)
- **Framework:** Express 5
- **ORM:** Sequelize (MySQL via `mysql2`)
- **Logging:** Winston (console + `app.log` file)
- **Config:** `dotenv`
- **Dev tooling:** `nodemon`

## Project structure

```
src/
  config/
    index.js           # re-exports ServerConfig and Logger
    server-config.js    # loads .env, exposes PORT
    logger-config.js    # Winston logger setup (console + app.log)
    config.json          # Sequelize CLI config (dev/test/production DB creds) — gitignored
  controllers/
    index.js            # re-exports all controllers
    info-controller.js  # example controller (GET /info health check)
  middlewares/
    index.js            # re-exports all middlewares (currently empty)
  migrations/            # Sequelize migration files (empty until you run sequelize-cli)
  models/
    index.js             # Sequelize model loader (auto-registers every model in this folder)
  routes/
    index.js             # mounts /v1 routes under /api
    v1/
      index.js           # v1 route definitions (currently mounts /info)
  seeders/                # Sequelize seed files (empty until you run sequelize-cli)
  services/
    index.js              # re-exports all services (currently empty)
  utils/
    index.js               # re-exports shared utility functions (currently empty)
  index.js                  # app entry point — creates the Express app and starts the server
```

The `index.js` barrel-file pattern (`config`, `controllers`, `middlewares`, `services`, `utils` each have an `index.js` that re-exports everything in that folder) keeps imports short elsewhere in the app, e.g. `require("../../controllers")` instead of reaching into individual files.

## Prerequisites

- Node.js v22+ and npm
- A running MySQL server (local or remote)

## Setup

1. **Clone and install dependencies**
   ```
   git clone https://github.com/juchi6/Airline-Booking-API.git
   cd "Movie Booking Backend"
   npm install
   ```

2. **Create your `.env` file** in the project root (this file is gitignored, so it won't exist after cloning):
   ```
   PORT=3000
   ```

3. **Configure the database.** `src/config/config.json` is gitignored (it can hold DB credentials) and won't exist after a fresh clone. Create it with your local MySQL credentials, e.g.:
   ```json
   {
     "development": {
       "username": "root",
       "password": null,
       "database": "database_development",
       "host": "127.0.0.1",
       "dialect": "mysql"
     },
     "test": {
       "username": "root",
       "password": null,
       "database": "database_test",
       "host": "127.0.0.1",
       "dialect": "mysql"
     },
     "production": {
       "username": "root",
       "password": null,
       "database": "database_production",
       "host": "127.0.0.1",
       "dialect": "mysql"
     }
   }
   ```
   > **Note:** There is no `.sequelizerc` in this project, so `sequelize-cli` uses its default paths (`models`, `migrations`, `seeders`, `config/config.json` relative to the project root) — but those folders actually live under `src/`. Running plain `npx sequelize-cli` commands from the root will fail to find them. Either add a `.sequelizerc` pointing at the `src/` paths, or pass `--config`, `--migrations-path`, `--seeders-path`, and `--models-path` flags explicitly when running CLI commands.

4. **Run the server in dev mode** (auto-restarts on file changes via nodemon):
   ```
   npm run dev
   ```
   You should see:
   ```
   Server is running on port 3000
   Hello to port 3000
   ```

## API

All routes are mounted under `/api/v1`.

| Method | Endpoint      | Description                          |
|--------|---------------|---------------------------------------|
| GET    | `/api/v1/info` | Health check — returns `{ success: true, message: "API is live" }` |

## Environment variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT`   | No       | `3000`  | Port the Express server listens on |

Database credentials are currently configured separately in `src/config/config.json` (see Setup step 3), not via `.env`.

## Logging

Winston logs to both the console and `app.log` (gitignored, regenerated on each run). The `Logger` export from `src/config` is currently commented out in `src/index.js` — uncomment it to log server startup events.

## Using this as a scaffold

This repo can be reused as a starting point for future Express + Sequelize projects:

```
git clone https://github.com/juchi6/Airline-Booking-API.git new-project-name
cd new-project-name
rm -rf .git
git init
```

This gives you the full folder structure with a clean git history. Note that as this repo evolves into the real Movie Booking API, its `main` branch will accumulate business-specific code — if you want a permanently generic scaffold, tag the current clean state (e.g. `git tag scaffold-v1`) and clone/branch from that tag instead of `main`.
