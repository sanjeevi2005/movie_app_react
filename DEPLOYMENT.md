# Deploy to Vercel

The frontend and movie API deploy together as one Vercel project. The API uses a Vercel Function backed by the shared handler and included 5,000-row demo CSV. The original 670 MB CSV is not required.

## Confirm the demo data is present

`backend/data/movies-demo.csv` is already generated and committed. To recreate it from the original source file, run this from the repository root:

```powershell
npm --prefix backend run prepare:demo-data -- 5000
```

## Deploy to Vercel

1. Sign in to [Vercel](https://vercel.com/) and select **Add New → Project**.
2. Import the GitHub repository `sanjeevi2005/movie_app_react`.
3. Keep the project root as the repository root. Use framework preset **Vite**, build command `npm run build`, and output directory `dist`.
4. Deploy. `vercel.json` includes the demo CSV in the API function, rewrites `/api/movies` to the Vercel Function, and serves direct SPA routes such as `/watchlist`.
5. Test search, pagination, saved movies, and refreshing `/watchlist`. No backend URL or CORS configuration is needed.

## Local development

Install dependencies and start the Express API:

```powershell
npm install
npm --prefix backend install
npm --prefix backend start
```

In another terminal, run the Vite frontend:

```powershell
npm run dev
```

Vite proxies `/api` to the local Express server at `http://localhost:5000`. To test the Vercel Function locally, install the Vercel CLI and run `vercel dev`.

## Data and watchlist notes

The demo API includes the first 5,000 movies. The function loads and parses this small CSV for each invocation; use a database if you later deploy the full dataset or need higher traffic. The watchlist is stored in browser `localStorage`, so it persists in that browser but does not sync across devices.