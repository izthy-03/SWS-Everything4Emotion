import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import MyAvatar from "./MyAvatar";
import { getCurrentUser } from "../pages/Login";

import "./NavBar.css";
import "../utilities.css"
/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = () => {

  const [user] = useState(JSON.parse(sessionStorage.getItem("userInfo")));

  useEffect(() => {
    console.log("now logged in user: ", user);
  }, [])

  return (
    <nav className="NavBar-container NavBar-line">
      <div>
        <div className="NavBar-title u-inlineBlock">Every4Emotion</div>
        <div className="NavBar-linkContainer u-inlineBlock">
          <Link to="/" className="NavBar-link">
            Mood
          </Link>
          <Link to="/feed/" className="NavBar-link">
            Feed
          </Link>

        </div>
      </div>
      <div>
        {user && user.email !== "" ?
          (<MyAvatar user={user} />) :
          (
            <div className="NavBar-linkContainer u-inlineBlock">
              <Link to="/login/" className="NavBar-link">
                Login
              </Link>
            </div>
          )
        }
      </div>
    </nav >
  );
};

export default NavBar;
