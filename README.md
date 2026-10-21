# movie_app_react

A React, Vite, and Express movie browser with title search, pagination, genre-filtered watchlists, and browser-persisted saved movies.

## Local development

Install frontend dependencies in the repository root and backend dependencies in `backend`:

```powershell
npm install
npm --prefix backend install
```

Run the API in one terminal:

```powershell
npm --prefix backend start
```

Run the frontend in another terminal:

```powershell
npm run dev
```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for Vercel frontend and Render API setup.