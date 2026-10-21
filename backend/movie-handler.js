import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import process from "node:process";
import Papa from "papaparse";

const moviesFilePath = resolve(process.cwd(), "backend/data/movies-demo.csv");

export default async function handleMoviesRequest(request) {
    if (request.method !== "GET") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const url = new URL(request.url);
        const csvText = await readFile(moviesFilePath, "utf8");
        const { data, errors } = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
        });

        if (errors.length > 0) {
            console.error("CSV parse error:", errors[0].message);
            return new Response(
                JSON.stringify({ error: "Failed to read movie data" }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const search = (url.searchParams.get("search") ?? "")
            .trim()
            .toLocaleLowerCase();
        const requestedPage = Number.parseInt(url.searchParams.get("page"), 10);
        const requestedLimit = Number.parseInt(
            url.searchParams.get("limit"),
            10,
        );
        const page =
            Number.isInteger(requestedPage) && requestedPage > 0
                ? requestedPage
                : 1;
        const limit =
            Number.isInteger(requestedLimit) && requestedLimit > 0
                ? Math.min(requestedLimit, 100)
                : 50;
        const filteredMovies = data.filter((movie) =>
            String(movie.title ?? "")
                .toLocaleLowerCase()
                .includes(search),
        );
        const offset = (page - 1) * limit;
        const movies = filteredMovies.slice(offset, offset + limit);

        return new Response(
            JSON.stringify({
                movies,
                page,
                hasMore: offset + movies.length < filteredMovies.length,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "public, max-age=60",
                },
            },
        );
    } catch (error) {
        console.error("Movie function error:", error);
        return new Response(
            JSON.stringify({ error: "Failed to load movie data" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            },
        );
    }
}
