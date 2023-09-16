

import PropTypes from "prop-types";

function NavBar({ children }) {
    NavBar.propTypes = {
        children: PropTypes.node.isRequired,
    }
    return (
        <nav className="nav-bar">
            {children }
        </nav>
);
}


export default NavBar;
