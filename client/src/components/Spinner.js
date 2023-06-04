import React from "react";

function Spinner() {
    return(
        <div className="spinner fixed-top bg-black z-3 d-flex align-items-center justify-content-center opacity-75">
            <div className="spinner-border text-light" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    )
}

export default Spinner;