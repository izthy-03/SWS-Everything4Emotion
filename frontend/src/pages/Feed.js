import React, { useState, useEffect } from "react";
import TextCard from "../components/TextCard";
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import SongList from "../components/SongList";

import "./Feed.css"
import "../utilities.css"

import { client } from "./Login";



const Feed = () => {

  const [res, setRes] = useState();
  const [songlist, setSonglist] = useState();

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
          setRes(res);
          setSonglist(res.data);
          sessionStorage.setItem("lastReq", bodyStr);
          sessionStorage.setItem("lastRes", JSON.stringify(res));
        })
        .catch((err) => { console.log(err) });
    }
    else {
      setRes(JSON.parse(lastResStr));
      setSonglist(JSON.parse(lastResStr).data);
    }
  }, []);

  return (
    <>
      {/* <NavBar /> */}
      <TextCard content={JSON.stringify(songlist)} />
      <SongList list={JSON.stringify(songlist)} />
      <ReactJkMusicPlayer mode="full" />
    </>
  );
}

export default Feed;