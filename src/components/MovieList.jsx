
import PropTypes from "prop-types";



function MovieList({movies}) {
    MovieList.propTypes = {
        movies: PropTypes.arrayOf(PropTypes.object),
    }
    return (
        <ul className="list">
            {movies?.map((movie) => (
                <Movie movie={movie} key={movie.imdbID} />
            ))}
            </ul>
    );
}
function Movie({ movie }) {
    Movie.propTypes = {
        movie: PropTypes.object,
    }
    return (
        <li>
                    <img src={movie.Poster} alt={`${movie.Title} poster`} />
                    <h3>{movie.Title}</h3>
                    <div>
                        <p>
                            <span>🗓</span>
                            <span>{movie.Year}</span>
                        </p>
                    </div>
                </li>
    );
}
export default MovieList;