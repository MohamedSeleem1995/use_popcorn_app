
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Logo from "./components/Logo";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedList from "./components/WatchedList";
import Box from "./components/ListBox";
import StarRating from "./components/StarRating";
/* import WatchedBox from "./components/WatchedBox"; */


/* const tempMovieData = [
  {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
      imdbID: "tt0133093",
      Title: "The Matrix",
      Year: "1999",
      Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
      imdbID: "tt6751668",
      Title: "Parasite",
      Year: "2019",
      Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
]; 

const tempWatchedData = [
  {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
      runtime: 148,
      imdbRating: 8.8,
      userRating: 10,
      },
  
  {
      imdbID: "tt0088763",
      Title: "Back to the Future",
      Year: "1985",
      Poster:
          "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
      runtime: 116,
      imdbRating: 8.5,
      userRating: 9,
},
]; */
const KEY = "99edcd02"; 
function App() {

  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

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
  
  useEffect(() => {
    
    async function fetchMovie() {

      try {
        
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
        if (!res.ok) throw new Error("Something went wrong with fetching movies");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie Not Found");
        setMovies(data.Search);
        
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    handleCloseMovie();
    fetchMovie();
  }, [query]);

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
  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre
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
    }
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }
  useEffect(() => {
    setIsLoading(true);
    async function getMovieDetails() {
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

  useEffect(() => {
    function callBack(e) {
      if (e.code === "Escape") {
        onCloseMovie();
        /* console.log("closing") */
      }
    }
    document.addEventListener("keydown", callBack);
      return () => document.removeEventListener("keydown", callBack);
  },[onCloseMovie]) 
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


