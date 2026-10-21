function GenreFilter({ genres = [], value = "", onChange }) {
    return (
        <select
            value={value}
            onChange={(event) => onChange?.(event.target.value)}
            aria-label="Filter watchlist by genre"
            className="p-2 mb-4 bg-gray-900/60 backdrop-blur-md text-white border rounded"
        >
            <option value="">All Genres</option>
            {genres.map((genre) => (
                <option key={genre} value={genre}>
                    {genre}
                </option>
            ))}
        </select>
    );
}

export default GenreFilter;
