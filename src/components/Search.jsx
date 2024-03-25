import PropTypes from "prop-types";
import {useRef } from "react";
import { useKey } from "./useKey";

function Search({ query, setQuery }) {
    Search.propTypes = {
        query: PropTypes.any,
        setQuery: PropTypes.func,
    }
    const inputElement = useRef(null);
    useKey("Enter", function () {
        if (document.activeElement === inputElement.current) return;
        inputElement.current.focus();
        setQuery("");
    })
    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputElement}
        />
    );
}
export default Search;