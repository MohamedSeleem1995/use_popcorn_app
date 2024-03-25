
import PropTypes from "prop-types";



function MovieList({movies, onSelectMovie}) {
    MovieList.propTypes = {
        movies: PropTypes.arrayOf(PropTypes.object),
        onSelectMovie : PropTypes.func,
    }
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie}/>
            ))}
            </ul>
    );
}
function Movie({ movie, onSelectMovie }) {
    Movie.propTypes = {
        movie: PropTypes.object,
        onSelectMovie : PropTypes.func,
    }

    return (
        <li onClick={()=> onSelectMovie(movie.imdbID)}>
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