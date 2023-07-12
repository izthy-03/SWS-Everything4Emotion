import React from "react";
import { Link } from "@reach/router";

import "./NavBar.css";
import "../utilities.css"

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = () => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">Every4Emotion</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Mood
        </Link>
        <Link to="/feed/" className="NavBar-link">
          Feed
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
