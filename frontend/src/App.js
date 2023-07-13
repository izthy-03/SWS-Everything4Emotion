import React, { useEffect } from "react";
import { Router } from "@reach/router";

import NavBar from "./components/NavBar";
import InputPage from './pages/InputPage';
import Feed from "./pages/Feed";
import NotFound from "./pages/NotFound";

import './App.css';
import "./utilities.css"

const App = () => {

  useEffect(() => { }, []);

  return (
    <>
      <NavBar />
      <div className="App">
        <Router>
          <InputPage path="/input/" key={111} />
          <Feed path="/feed/" key={222} />
          <NotFound default key={333} />
        </Router>
      </div>
    </>
  );
}

export default App;
