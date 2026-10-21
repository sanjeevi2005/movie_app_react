import { useState } from "react";
import MovieCard from "../components/MovieCard";
import GenreFilter from "../components/GenreFilter";

function WatchList({ watchlist = [], onToggleWatchlist }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase();
    const genres = [
        ...new Set(
            watchlist.flatMap((movie) =>
                String(movie.genres ?? "")
                    .split(",")
                    .map((genre) => genre.trim())
                    .filter(Boolean),
            ),
        ),
    ].sort((firstGenre, secondGenre) => firstGenre.localeCompare(secondGenre));
    const filteredMovies = watchlist.filter(
        (movie) =>
            String(movie.title ?? "")
                .toLocaleLowerCase()
                .includes(normalizedSearch) &&
            (!selectedGenre ||
                String(movie.genres ?? "")
                    .split(",")
                    .some((genre) => genre.trim() === selectedGenre)),
    );

    return (
        <div className="p-4 pt-16">
            <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                aria-label="Search watchlist by title"
                placeholder="Search your watchlist..."
                className="p-2 w-3/4 md:w-1/2 border rounded border-gray-700 bg-gray-900/60 
                           fixed top-16 left-1/2 transform -translate-x-1/2 text-white backdrop-blur-md z-10 "
            />
            <div className="mt-16 flex justify-center">
                <GenreFilter
                    genres={genres}
                    value={selectedGenre}
                    onChange={setSelectedGenre}
                />
            </div>
            {watchlist.length === 0 ? (
                <p className="mt-4 text-center text-gray-300">
                    Your watchlist is empty. Add movies using the heart button.
                </p>
            ) : filteredMovies.length === 0 ? (
                <p className="mt-4 text-center text-gray-300">
                    No saved movies match those filters.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    {filteredMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            isSaved
                            onToggleWatchlist={onToggleWatchlist}
                        />
                    ))}
                </div>
            )}
            {filteredMovies.length > 0 && (
                <p className="mt-5 text-center text-sm text-gray-400">
                    {filteredMovies.length} saved{" "}
                    {filteredMovies.length === 1 ? "movie" : "movies"}
                </p>
            )}
        </div>
    );
}

export default WatchList;
