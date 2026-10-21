import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import WatchList from "./pages/WatchList";

const WATCHLIST_STORAGE_KEY = "movie-app-watchlist";

function App() {
    const [watchlist, setWatchlist] = useState(() => {
        try {
            const savedWatchlist = localStorage.getItem(WATCHLIST_STORAGE_KEY);
            const parsedWatchlist = savedWatchlist
                ? JSON.parse(savedWatchlist)
                : [];
            return Array.isArray(parsedWatchlist) ? parsedWatchlist : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(watchlist));
    }, [watchlist]);

    function toggleWatchlist(movie) {
        setWatchlist((currentWatchlist) => {
            const alreadySaved = currentWatchlist.some(
                (savedMovie) => String(savedMovie.id) === String(movie.id),
            );

            return alreadySaved
                ? currentWatchlist.filter(
                      (savedMovie) =>
                          String(savedMovie.id) !== String(movie.id),
                  )
                : [...currentWatchlist, movie];
        });
    }

    return (
        <div>
            <BrowserRouter>
                <Navbar watchlistCount={watchlist.length} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                watchlist={watchlist}
                                onToggleWatchlist={toggleWatchlist}
                            />
                        }
                    />
                    <Route
                        path="/watchlist"
                        element={
                            <WatchList
                                watchlist={watchlist}
                                onToggleWatchlist={toggleWatchlist}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
