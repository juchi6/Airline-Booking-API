# Airline Booking API

A Node.js/Express REST API for browsing flights and booking seats — cities, airports, airplanes, flights, and transactional, concurrency-safe seat booking, backed by MySQL via Sequelize.

## Tech stack

- **Runtime:** Node.js (v22.x)
- **Framework:** Express 5
- **ORM:** Sequelize (MySQL via `mysql2`)
- **Auth:** JWT (`jsonwebtoken`) + `bcryptjs` password hashing
- **Validation:** Joi
- **API docs:** OpenAPI 3.0 spec served via `swagger-ui-express`
- **Security/ops middleware:** `helmet`, `cors`, `morgan` (piped into Winston), `express-rate-limit`
- **Logging:** Winston (console + `app.log` file)
- **Config:** `dotenv`
- **Dev tooling:** `nodemon`

## Project structure

```
src/
  config/
    index.js              # re-exports ServerConfig and Logger
    server-config.js       # loads/validates .env (PORT, NODE_ENV, JWT_SECRET, JWT_EXPIRES_IN, CORS_ORIGIN)
    logger-config.js       # Winston logger setup (console + app.log)
    config.json             # Sequelize CLI config (dev/test/production DB creds) — gitignored
  controllers/              # request handlers, one per resource (auth, airplane, city, airport, flight, booking, info)
  docs/
    swagger-spec.js         # hand-authored OpenAPI 3.0 spec served at /api-docs
  middlewares/               # errorHandler, notFound, validate, protect, authorize, httpLogger, RateLimiter
  migrations/                  # Sequelize migrations (Airplane, User, City, Airport, Flight, Booking)
  models/                       # Sequelize models + associations (models/index.js auto-loads every file here)
  repositories/                  # CrudRepository base class + one subclass per resource
  routes/
    index.js                     # mounts /v1 under /api
    v1/                           # one route file per resource, mounted in v1/index.js
  services/                        # business logic layer, one per resource
  utils/                            # AppError, catchAsync, JWT sign/verify
  validators/                       # Joi schemas, one file per resource, flattened into one namespace
  index.js                          # app entry point — Express app, middleware stack, server start
```

The `index.js` barrel-file pattern (`config`, `controllers`, `middlewares`, `services`, `repositories`, `utils`, `validators` each have an `index.js` that re-exports everything in that folder) keeps imports short elsewhere in the app, e.g. `require("../../controllers")` instead of reaching into individual files.

## Domain model

```
City 1──* Airport 1──* Flight *──1 Airplane
                         │
                         *
                       Booking *──1 User
```

- A **Flight** references an **Airplane** (which plane operates it) and two **Airports** (departure/arrival).
- `Flight.totalSeats` is seeded from the airplane's capacity when the flight is created, then decremented per booking.
- A **Booking** references a **Flight** and the **User** who made it. `totalCost` is always computed server-side (`flight.price * noOfSeats`) — never trusted from the client.
- Seat booking is wrapped in a Sequelize transaction with a row lock (`SELECT ... FOR UPDATE` via `transaction.LOCK.UPDATE`) on the `Flight` row, so concurrent booking requests for the same flight can never overbook it.

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

2. **Create your `.env` file** in the project root (gitignored, won't exist after cloning — see `.env.example` for the template):
   ```
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=replace_with_a_long_random_string
   JWT_EXPIRES_IN=1d
   CORS_ORIGIN=*
   ```
   `JWT_SECRET` is required — the server validates env vars at startup and refuses to boot without it.

3. **Configure the database.** `src/config/config.json` is gitignored and won't exist after a fresh clone. Create it with your local MySQL credentials, e.g.:
   ```json
   {
     "development": {
       "username": "root",
       "password": null,
       "database": "Flights",
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
   > **Note:** There is no `.sequelizerc` in this project, so `sequelize-cli` needs explicit path flags to find `src/`:
   > ```
   > npx sequelize-cli db:migrate --config src/config/config.json --migrations-path src/migrations --models-path src/models
   > ```

4. **Run the server in dev mode** (auto-restarts on file changes via nodemon):
   ```
   npm run dev
   ```
   You should see `Server is running on port 3000` in the console and `app.log`.

## API

All routes are mounted under `/api/v1`. Interactive, always-up-to-date docs (with request/response schemas and a "try it out" console) are served at **`/api-docs`** once the server is running.

| Method | Endpoint                  | Auth              | Description |
|--------|----------------------------|-------------------|--------------|
| GET    | `/api/v1/info`             | —                 | Health check |
| POST   | `/api/v1/auth/register`    | —                 | Register a new user |
| POST   | `/api/v1/auth/login`       | —                 | Log in, returns a JWT |
| POST   | `/api/v1/airplanes`        | admin             | Create an airplane |
| POST   | `/api/v1/cities`           | admin             | Create a city |
| GET    | `/api/v1/cities`           | —                 | List cities |
| GET    | `/api/v1/cities/:id`       | —                 | Get a city |
| POST   | `/api/v1/airports`         | admin             | Create an airport |
| GET    | `/api/v1/airports`         | —                 | List airports |
| GET    | `/api/v1/airports/:id`     | —                 | Get an airport |
| POST   | `/api/v1/flights`          | admin             | Create a flight |
| GET    | `/api/v1/flights`          | —                 | List flights |
| GET    | `/api/v1/flights/:id`      | —                 | Get a flight |
| POST   | `/api/v1/bookings`         | any logged-in user | Book seats on a flight |
| GET    | `/api/v1/bookings/me`      | any logged-in user | List your own bookings |
| GET    | `/api/v1/bookings`         | admin             | List all bookings |

Admin-gated routes require `Authorization: Bearer <token>` for a user with `role: "admin"`. There is no admin-creation endpoint — `/auth/register` always creates a `role: "user"` account; promote one manually via `UPDATE Users SET role='admin' WHERE email='...';`.

## Environment variables

| Variable         | Required | Default       | Description |
|------------------|----------|---------------|-------------|
| `PORT`           | No       | `3000`        | Port the Express server listens on |
| `NODE_ENV`       | No       | `development` | Environment name |
| `JWT_SECRET`     | Yes      | —             | Secret used to sign/verify JWTs — the server refuses to start without it |
| `JWT_EXPIRES_IN` | No       | `1d`          | JWT expiry |
| `CORS_ORIGIN`    | No       | `*`           | Allowed CORS origin |

See `.env.example` for a template. Database credentials are configured separately in `src/config/config.json` (see Setup step 3), not via `.env`.

## Logging

Winston logs to both the console and `app.log` (gitignored, regenerated on each run). HTTP request logs (via `morgan`, combined format) are piped into the same Winston pipeline under the `HTTP` label.
