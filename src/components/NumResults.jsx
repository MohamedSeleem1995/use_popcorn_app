import PropTypes from "prop-types";

function NumResults({ movies }) {
    NumResults.propTypes = {
        movies: PropTypes.arrayOf(PropTypes.object), 
    }
    
    return (
        <p className="num-results">
            Found <strong>{movies.length }</strong> results
        </p>
    );
}
export default NumResults;