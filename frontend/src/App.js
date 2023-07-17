import React, { useEffect } from "react";
import { Router } from "@reach/router";

import NavBar from "./components/NavBar";
import InputPage from './pages/InputPage';
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import './App.css';
import "./utilities.css"
import './pages/Login.css'

const App = () => {

  useEffect(() => { }, []);

  return (
    <>
      <NavBar />
      {/* <div className="App"> */}
      <Router>
        <InputPage path="/" />
        <Feed path="/feed/" />
        <Login path="/login/" />
        <NotFound default />
      </Router>
      {/* </div> */}
    </>
  );
}

export default App;
