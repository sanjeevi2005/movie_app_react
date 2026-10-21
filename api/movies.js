import handleMoviesRequest from "../backend/movie-handler.js";

export default async function handler(request, response) {
    const host = request.headers.host ?? "localhost";
    const url = new URL(request.url ?? "/api/movies", `https://${host}`);
    const result = await handleMoviesRequest(
        new Request(url, { method: request.method }),
    );

    response.status(result.status);
    for (const [name, value] of result.headers) {
        response.setHeader(name, value);
    }
    response.send(await result.text());
}
