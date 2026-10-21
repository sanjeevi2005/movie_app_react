import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

function Home({ watchlist = [], onToggleWatchlist }) {
    // const movies = [
    //     {
    //         poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMMo594Fpb7eq7DVm7c6O7K9dSAieVGMAZq-FRLx-SYZgCioYzRmMQ8QzNa5xhrrgiMy2ljyz1hBqYsFMMlcXqj41mx1pdnfXSMv7tuHx&s=10",
    //         title: "Jailer 2",
    //         release_date: "2026",
    //     },
    //     {
    //         poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMMo594Fpb7eq7DVm7c6O7K9dSAieVGMAZq-FRLx-SYZgCioYzRmMQ8QzNa5xhrrgiMy2ljyz1hBqYsFMMlcXqj41mx1pdnfXSMv7tuHx&s=10",
    //         title: "Jailer 2",
    //         release_date: "2026",
    //     },
    //     {
    //         poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMMo594Fpb7eq7DVm7c6O7K9dSAieVGMAZq-FRLx-SYZgCioYzRmMQ8QzNa5xhrrgiMy2ljyz1hBqYsFMMlcXqj41mx1pdnfXSMv7tuHx&s=10",
    //         title: "Jailer 2",
    //         release_date: "2026",
    //     },
    //     {
    //         poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMMo594Fpb7eq7DVm7c6O7K9dSAieVGMAZq-FRLx-SYZgCioYzRmMQ8QzNa5xhrrgiMy2ljyz1hBqYsFMMlcXqj41mx1pdnfXSMv7tuHx&s=10",
    //         title: "Jailer 2",
    //         release_date: "2026",
    //     },
    //     {
    //         poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMMo594Fpb7eq7DVm7c6O7K9dSAieVGMAZq-FRLx-SYZgCioYzRmMQ8QzNa5xhrrgiMy2ljyz1hBqYsFMMlcXqj41mx1pdnfXSMv7tuHx&s=10",
    //         title: "Jailer 2",
    //         release_date: "2026",
    //     },
    //     {
    //         poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMMo594Fpb7eq7DVm7c6O7K9dSAieVGMAZq-FRLx-SYZgCioYzRmMQ8QzNa5xhrrgiMy2ljyz1hBqYsFMMlcXqj41mx1pdnfXSMv7tuHx&s=10",
    //         title: "Jailer 2",
    //         release_date: "2026",
    //     },
    //     {
    //         poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMMo594Fpb7eq7DVm7c6O7K9dSAieVGMAZq-FRLx-SYZgCioYzRmMQ8QzNa5xhrrgiMy2ljyz1hBqYsFMMlcXqj41mx1pdnfXSMv7tuHx&s=10",
    //         title: "Jailer 2",
    //         release_date: "2026",
    //     },
    //     {
    //         poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMMo594Fpb7eq7DVm7c6O7K9dSAieVGMAZq-FRLx-SYZgCioYzRmMQ8QzNa5xhrrgiMy2ljyz1hBqYsFMMlcXqj41mx1pdnfXSMv7tuHx&s=10",
    //         title: "Jailer 2",
    //         release_date: "2026",
    //     },
    //     {
    //         poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMMo594Fpb7eq7DVm7c6O7K9dSAieVGMAZq-FRLx-SYZgCioYzRmMQ8QzNa5xhrrgiMy2ljyz1hBqYsFMMlcXqj41mx1pdnfXSMv7tuHx&s=10",
    //         title: "Jailer 2",
    //         release_date: "2026",
    //     },
    //     {
    //         poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMMo594Fpb7eq7DVm7c6O7K9dSAieVGMAZq-FRLx-SYZgCioYzRmMQ8QzNa5xhrrgiMy2ljyz1hBqYsFMMlcXqj41mx1pdnfXSMv7tuHx&s=10",
    //         title: "Jailer 2",
    //         release_date: "2026",
    //     },
    //     {
    //         poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMMo594Fpb7eq7DVm7c6O7K9dSAieVGMAZq-FRLx-SYZgCioYzRmMQ8QzNa5xhrrgiMy2ljyz1hBqYsFMMlcXqj41mx1pdnfXSMv7tuHx&s=10",
    //         title: "Jailer 2",
    //         release_date: "2026",
    //     },
    // ];

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        let isCurrentRequest = true;
        const timeoutId = setTimeout(() => {
            const params = new URLSearchParams({
                page: String(page),
                limit: "20",
                search: searchTerm,
            });

            fetch(`/api/movies?${params}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(
                            `Movie request failed with status ${res.status}`,
                        );
                    }
                    return res.json();
                })
                .then((data) => {
                    const pageMovies = Array.isArray(data) ? data : data.movies;
                    if (!Array.isArray(pageMovies)) {
                        throw new Error(
                            "The movies API returned an unexpected response.",
                        );
                    }
                    if (isCurrentRequest) {
                        setMovies(pageMovies);
                        setHasMore(
                            Array.isArray(data) ? false : Boolean(data.hasMore),
                        );
                        setError("");
                    }
                })
                .catch((requestError) => {
                    console.log(requestError);
                    if (isCurrentRequest) {
                        setError(
                            "Could not load movies. Check that the backend is running.",
                        );
                    }
                })
                .finally(() => {
                    if (isCurrentRequest) {
                        setIsLoading(false);
                    }
                });
        }, 300);

        return () => {
            isCurrentRequest = false;
            clearTimeout(timeoutId);
        };
    }, [page, searchTerm]);

    return (
        <div className="p-4 pt-16">
            <input
                type="text"
                value={searchTerm}
                onChange={(event) => {
                    setIsLoading(true);
                    setSearchTerm(event.target.value);
                    setPage(1);
                }}
                aria-label="Search movies by title"
                placeholder="Search movies by title..."
                className="p-2 w-3/4 md:w-1/2 border rounded border-gray-700 bg-gray-900/60 
                           fixed top-16 left-1/2 transform -translate-x-1/2 text-white backdrop-blur-md z-10 "
            />
            {error && <p className="mt-16 text-center text-red-400">{error}</p>}
            {isLoading && (
                <p className="mt-16 text-center text-gray-300">
                    Loading movies...
                </p>
            )}
            {!isLoading && !error && movies.length === 0 && (
                <p className="mt-16 text-center text-gray-300">
                    No movies found.
                </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-16">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        isSaved={watchlist.some(
                            (savedMovie) =>
                                String(savedMovie.id) === String(movie.id),
                        )}
                        onToggleWatchlist={onToggleWatchlist}
                    />
                ))}
            </div>
            <div className="pagination-container flex justify-between mt-5">
                <button
                    className="p-2 bg-gray-700 text-white rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => {
                        setIsLoading(true);
                        setPage((currentPage) => currentPage - 1);
                    }}
                    disabled={page === 1 || isLoading}
                >
                    PREV
                </button>
                <span className="self-center text-white">Page {page}</span>
                <button
                    className="p-2 bg-gray-700 text-white rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => {
                        setIsLoading(true);
                        setPage((currentPage) => currentPage + 1);
                    }}
                    disabled={!hasMore || isLoading}
                >
                    NEXT
                </button>
            </div>
        </div>
    );
}

export default Home;
