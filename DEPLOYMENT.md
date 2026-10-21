# Demo Deployment

This setup deploys the Vite frontend to Vercel and the Express API to Render. The backend serves the 5,000-row file at `backend/data/movies-demo.csv`; the original 670 MB source file is not required in the deployed service.

## Prepare the demo data

From the repository root, run:

```powershell
npm --prefix backend run prepare:demo-data -- 5000
```

The generated CSV is included in the repository. The original source CSV is excluded by `.gitignore`.

## Deploy the API to Render

1. Push the project to a Git repository and create a Render Blueprint from it, or create a Web Service manually.
2. For a manual service, set the root directory to `backend`, build command to `npm install`, and start command to `npm start`.
3. Set the `FRONTEND_ORIGIN` environment variable to the exact deployed Vercel origin, such as `https://your-project.vercel.app`. Leave `MOVIES_CSV_PATH` unset to use the included demo CSV.
4. After deployment, verify `https://<render-service>.onrender.com/health` returns `{"status":"ok"}`.

The root `render.yaml` contains the equivalent service configuration.

## Deploy the frontend to Vercel

1. Import the same repository into Vercel and keep the project root at the repository root.
2. Set the `VITE_API_URL` environment variable to the Render service origin, for example `https://your-api.onrender.com` (no `/api/movies` suffix).
3. Build command: `npm run build`. Output directory: `dist`.
4. Deploy, then test the home page and `/watchlist`. `vercel.json` routes direct SPA URLs back to `index.html`.

For local development, omit `VITE_API_URL`; the frontend defaults to `http://localhost:5000`.

## Limitations

The demo dataset includes only the first 5,000 source rows. Increase the number when generating it if needed, but keep the resulting file within your hosting and Git limits. The watchlist uses browser `localStorage`, so it is local to each browser and does not sync between devices.