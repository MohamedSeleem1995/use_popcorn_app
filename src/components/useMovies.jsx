import { useEffect, useState } from "react";
const KEY = "99edcd02"; 

export function useMovies(query) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [movies, setMovies] = useState([]);
    useEffect(() => {
    /* callBack?.() */
        async function fetchMovie() {
    
          try {
            setIsLoading(true)
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
        /* handleCloseMovie(); */
        fetchMovie();
    }, [query]);
    return {movies, isLoading, error}
}
