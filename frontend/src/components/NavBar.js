import React from "react";
import { Link } from "@reach/router";
import MyAvatar from "./MyAvatar";

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
        <Link to="/login/" className="NavBar-link">
          Login
        </Link>
        <MyAvatar style={{ margin: "1000" }} />
      </div>
    </nav>
  );
};

export default NavBar;
