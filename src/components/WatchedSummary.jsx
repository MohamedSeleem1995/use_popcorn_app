import PropTypes, { string } from "prop-types";

function WatchedSummary({ watched }) {
    WatchedSummary.propTypes = {
        watched: PropTypes.arrayOf(PropTypes.object, string),
    }

    const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating)); /* all of the average vars in derived states from  watched arr */
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));
    
    return (
        <div className="summary">
                <h2>Movies you watched</h2>
                <div>
                    <p>
                        <span>#️⃣</span>
                        <span>{watched.length} movies</span>
                    </p>
                    <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating.toFixed(1)}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating.toFixed(1)}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
    </div>
    );
}
export default WatchedSummary;