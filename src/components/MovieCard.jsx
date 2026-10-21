import { FaHeart, FaRegHeart } from "react-icons/fa";

function MovieCard({ movie, isSaved = false, onToggleWatchlist }) {
    return (
        <div className=" bg-gray-800 p-4 rounded-lg shadow-md text-white relative">
            <img
                className="w-full h-80 object-contain rounded-md"
                src={movie.poster_path}
                alt={movie.title}
            />
            <h3 className="text-lg font-bold mt-4">{movie.title}</h3>
            <p className="text-sm text-gray-400">{movie.release_date}</p>
            <button
                type="button"
                className="text-xl absolute top-2 right-2 text-red-500"
                onClick={() => onToggleWatchlist?.(movie)}
                aria-label={
                    isSaved
                        ? `Remove ${movie.title} from watchlist`
                        : `Add ${movie.title} to watchlist`
                }
                aria-pressed={isSaved}
                title={isSaved ? "Remove from watchlist" : "Add to watchlist"}
            >
                {isSaved ? <FaHeart /> : <FaRegHeart />}
            </button>
        </div>
    );
}

export default MovieCard;
