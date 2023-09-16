import { useState } from "react";
import propTypes from "prop-types";

function Box({children }) {
    const [isOpen, setIsOpen] = useState(true);
    Box.propTypes = {
        children: propTypes.node.isRequired,
    }
    
    return (
        <div className="box">
                <button
                    className="btn-toggle"
                    onClick={() => setIsOpen((open) => !open)}
                >
                    {isOpen ? "–" : "+"}
                </button>
            {isOpen && children}
            </div>
    );
}

export default Box;