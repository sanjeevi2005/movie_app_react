import { Link } from "react-router-dom";

function Navbar({ watchlistCount = 0 }) {
    return (
        <div className="bg-gray-900 p-4 flex justify-between text-white fixed w-full top-0 z-10">
            <Link to="/" className="text-xl font-bold">
                Movie App
            </Link>
            <Link to="/watchlist" className="text-xl">
                WatchList({watchlistCount})
            </Link>
        </div>
    );
}

export default Navbar;
