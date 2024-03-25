import PropTypes from "prop-types";


function Main({children}) {
    Main.propTypes = {
    children: PropTypes.node,
}
    return (
        <main className="main">
            {children}
        </main>
);
}
export default Main;


