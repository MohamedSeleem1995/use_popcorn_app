import PropTypes from "prop-types";


function Main({children}) {
    Main.propTypes = {
    children: PropTypes.node.isRequired,
}
    return (
        <main className="main">
            {children}
        </main>
);
}
export default Main;


