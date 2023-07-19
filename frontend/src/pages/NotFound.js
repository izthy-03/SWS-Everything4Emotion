import React from "react";
import NavBar from "../components/NavBar";

const NotFound = () => {
    return (
        <div style={{ textAlign: "center", marginTop: "5%" }}>
            {/* <NavBar /> */}
            <h1>404 Not Found</h1>
            <p>The page you requested couldn't be found.</p>
        </div>
    );
};
export default NotFound;
