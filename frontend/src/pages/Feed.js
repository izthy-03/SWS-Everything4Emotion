import React, { useState, useEffect } from "react";
import TextCard from "../components/TextCard";
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import axios from "axios";
import { getCSRFTokenFromCookie } from "../utilities";

import "./Feed.css"
import "../utilities.css"

import { client } from "./Login";



const Feed = () => {

  const [res, setRes] = useState("");

  useEffect(() => {

    let bodyStr = sessionStorage.getItem("request");
    let body = JSON.parse(sessionStorage.getItem("request"));

    let lastReqStr = sessionStorage.getItem("lastReq");
    let lastResStr = sessionStorage.getItem("lastRes");

    console.log("lastReq:\n", lastReqStr);
    console.log("nowReq:\n", bodyStr);
    // same as last submit or no another submit
    if (bodyStr !== lastReqStr) {
      client.post(
        "/query/", body
      )
        .then((res) => {
          console.log("new fetch:\n", res);
          setRes(res.data);
          sessionStorage.setItem("lastReq", bodyStr);
          sessionStorage.setItem("lastRes", res.data);
        })
        .catch((err) => { console.log(err) });
    }
    else {
      setRes(lastResStr);
    }
  }, []);

  return (
    <>
      {/* <NavBar /> */}
      <TextCard content={res} />
      <ReactJkMusicPlayer mode="full" />
    </>
  );
}

export default Feed;