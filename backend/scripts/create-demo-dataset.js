import { createReadStream, createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { finished } from "node:stream/promises";
import csv from "csv-parser";

const sourcePath = fileURLToPath(
    new URL("../TMDB_movie_dataset_v11.csv", import.meta.url),
);
const outputPath = fileURLToPath(
    new URL("../data/movies-demo.csv", import.meta.url),
);
const rowLimit = Number.parseInt(process.argv[2] ?? "5000", 10);

if (!Number.isInteger(rowLimit) || rowLimit < 1) {
    throw new Error(
        "Provide a positive row limit, for example: node scripts/create-demo-dataset.js 5000",
    );
}

await mkdir(dirname(outputPath), { recursive: true });

const output = createWriteStream(outputPath, { encoding: "utf8" });
const escapeCsvValue = (value) =>
    `"${String(value ?? "").replaceAll('"', '""')}"`;
let columns;
let rowsWritten = 0;

try {
    const parsedRows = createReadStream(sourcePath).pipe(csv());

    for await (const movie of parsedRows) {
        if (!columns) {
            columns = Object.keys(movie);
            output.write(`${columns.map(escapeCsvValue).join(",")}\r\n`);
        }

        output.write(
            `${columns.map((column) => escapeCsvValue(movie[column])).join(",")}\r\n`,
        );
        rowsWritten += 1;

        if (rowsWritten >= rowLimit) {
            break;
        }
    }

    output.end();
    await finished(output);
} catch (error) {
    output.destroy();
    throw error;
}

console.log(`Wrote ${rowsWritten} movies to ${resolve(outputPath)}`);
