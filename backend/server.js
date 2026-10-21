import express from "express";
import cors from "cors";
import fs from "fs";
import process from "node:process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import csv from "csv-parser";

const app = express();
const moviesFilePath = process.env.MOVIES_CSV_PATH
    ? resolve(process.env.MOVIES_CSV_PATH)
    : fileURLToPath(new URL("./data/movies-demo.csv", import.meta.url));
const allowedOrigins = process.env.FRONTEND_ORIGIN?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors(allowedOrigins?.length ? { origin: allowedOrigins } : undefined));

app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});

app.get("/api/movies", (req, res) => {
    const requestedPage = Number.parseInt(req.query.page, 10);
    const requestedLimit = Number.parseInt(req.query.limit, 10);
    const page =
        Number.isInteger(requestedPage) && requestedPage > 0
            ? requestedPage
            : 1;
    const limit =
        Number.isInteger(requestedLimit) && requestedLimit > 0
            ? Math.min(requestedLimit, 100)
            : 50;
    const search = String(req.query.search ?? "")
        .trim()
        .toLocaleLowerCase();
    const offset = (page - 1) * limit;
    const movies = [];
    let matchingRowIndex = 0;

    const fileStream = fs.createReadStream(moviesFilePath);

    const csvStream = fileStream.pipe(csv());
    const handleStreamError = (error) => {
        console.error("CSV ERROR:", error);

        if (!res.headersSent) {
            res.status(500).json({ error: "Failed to read movie data" });
        }
    };

    fileStream.on("error", handleStreamError);

    csvStream.on("data", (movie) => {
        if (
            search &&
            !String(movie.title ?? "")
                .toLocaleLowerCase()
                .includes(search)
        ) {
            return;
        }

        if (matchingRowIndex++ < offset) {
            return;
        }

        if (movies.length < limit) {
            movies.push(movie);
            return;
        }

        res.json({ movies, page, hasMore: true });
        fileStream.destroy();
        csvStream.destroy();
    });

    csvStream.on("end", () => {
        if (!res.headersSent) {
            res.json({ movies, page, hasMore: false });
        }
    });

    csvStream.on("error", (error) => {
        handleStreamError(error);
    });
});

const port = Number(process.env.PORT) || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
