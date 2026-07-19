# ts-app

A TypeScript app with Docker Compose for frontend and backend services.

## Project structure

- `docker-compose.yml` - Defines two services: `frontend` and `backend`.
- `docker/ts-app/backend/` - TypeScript backend service.
- `docker/ts-app/frontend/` - Static frontend served by Nginx.

## Services

### Backend

- Built from `docker/ts-app/backend/Dockerfile`
- Runs on port `3001`
- Provides API endpoints:
  - `GET /api/message`
  - `GET /api/info`

### Frontend

- Built from `docker/ts-app/frontend/Dockerfile`
- Served by Nginx on port `3000`
- Proxies `/api/*` requests to the backend service

## Run with Docker Compose

From the workspace root:

```bash
docker compose up --build
```

Then open:

- Frontend: `http://localhost:3000`
- Backend direct: `http://localhost:3001`

## Useful commands

- Start services:
```bash
docker compose up --build
```
- Stop services:
```bash
docker compose down
```
- Rebuild only backend:
```bash
docker compose build backend
```
- Rebuild only frontend:
```bash
docker compose build frontend
```

## Notes ( for running locally)

- The frontend uses `nginx.conf` to proxy `/api` requests to `http://backend:3001`.
- The backend is a TypeScript app compiled with `tsc` and served with Node.js.
- If you need to run backend development locally, use:
```bash
cd docker/ts-app/backend
npm install
npm run build
npm start
```

