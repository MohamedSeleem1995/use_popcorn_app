
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import Logo from "./components/Logo";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedList from "./components/WatchedList";
import Box from "./components/ListBox";
import StarRating from "./components/StarRating";
import { useMovies } from "./components/useMovies";
import { useLocalStorageState } from "./components/useLocalStorageState";
import { useKey } from "./components/useKey";

const KEY = "99edcd02"; 
function App() {

/*   const [watched, setWatched] = useState([]); */
  
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query)
  const [ watched, setWatched ] = useLocalStorageState([], "watched");
 
/*   const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue)
  }); */

  function handleSelectedMovie(id) {
    setSelectedId(selectedId=> id === selectedId ? null : id);
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatch(movie) {
    setWatched((watched) => [...watched, movie] )
  }
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }


  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery}/>
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        {/* here we make the result with children prop */}
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} /> } */}
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectedMovie}  />}
          {error && <ErrorMessage message={error} /> }
        </Box>
          
        <Box>
          {selectedId ? (
            <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} onAddWatched={handleAddWatch} watched= {watched} />
          ) : (
            <>
              <WatchedSummary watched={watched}/> 
                <WatchedList watched={watched} onDeleteWatched={handleDeleteWatched } />
            </>
          ) }
        </Box>
          
        {/* <WatchedBox /> */}
        {/* another way of achieving the same result with prop composition explicity defined prop  */}
        {/* <Box element={<MovieList movies={movies} />} />
        <Box element={ 
          <>
            <WatchedSummary watched={watched}/> 
            <WatchedList watched={watched} />
          </>
        }
        /> */}
      </Main>
    </>
  );
}
function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  MovieDetails.propTypes = {
    selectedId: PropTypes.string,
    onCloseMovie: PropTypes.func,
    onAddWatched: PropTypes.func,
    watched:  PropTypes.array,
  }

  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);
  useEffect(() => {
    if (userRating) countRef.current += 1;
    /* console.log(countRef.current) */
    
  },[userRating])
  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    
  } = movie;
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  
  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      poster,
      userRating,
      imdbRating: +imdbRating,
      runtime: Number(runtime.split(" ").at(0)),
      countRatingDecisions: countRef.current, 
    }
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }
  useKey("Escape" ,onCloseMovie)
  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = "usePopcorn";
      /* console.log("movie title" + title) */
    };
  }, [title]);

  
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
          <>
            <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of the ${title} movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p><span>⭐</span> {imdbRating} IMDb Rating</p>
        </div>
      </header>
      <section>
        <div className="rating">
                {isWatched ?
                  (
                    <p>You Rating this movie {watchedUserRating}</p>
                  ) : (
                    <>
                      <StarRating maxRating={10} size="24" onSetRating={setUserRating}/>
                      {userRating > 0 && (
                        <button className="btn-add" onClick={handleAdd}>
                        + Add to list
                        </button>
                )}
                    </>
                )}
        <p><em>{plot}</em></p>
        <p>Starring {actors}</p>
        <p>Directed by {director }</p>
        </div>
      </section>
          </>
      )}
      
    </div>
  );
}
function Loader() {
  return (
    <p className="loader">Loading...</p>
  );
}

function ErrorMessage({ message }) {
  ErrorMessage.propTypes = {
    message: PropTypes.string,
  }
  return (
    <p className="error">
      <span>❗</span> {message}
    </p>
  );
}


export default App;


