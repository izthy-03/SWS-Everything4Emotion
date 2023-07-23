import React, { useState, useEffect, useLayoutEffect } from "react";
import TextCard from "../components/TextCard";
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import SongList from "../components/SongList";
import axios from "axios";

import "./Feed.css"
import "../utilities.css"

import { client } from "./Login";


const Feed = () => {

  // const [res, setRes] = useState();
  const [songlist, setSonglist] = useState([]);

  const query = (body) => {
    return client.post("/query/", body)
      .then((res) => {
        console.log("new fetch:\n", res);
        return res;
      });
  }

  useEffect(() => {
    // same as last submit or no another submit
    let bodyStr = sessionStorage.getItem("request");
    let body = JSON.parse(sessionStorage.getItem("request"));
    // body = { ...body, csrfmiddlewaretoken: document.csrfmiddlewaretoken };

    let lastReqStr = sessionStorage.getItem("lastReq");
    let lastResStr = sessionStorage.getItem("lastRes");
    if (bodyStr !== lastReqStr) {
      query(body)
        .then((res) => {
          // setRes(res);
          setSonglist(res.data);
          sessionStorage.setItem("lastReq", bodyStr);
          sessionStorage.setItem("lastRes", JSON.stringify(res));

          console.log('fetch done');
          console.log("lastReq:\n", lastReqStr);
          console.log("nowReq:\n", bodyStr);
        }).catch((err) => { console.log(err) });

    }
    else {
      // setRes(JSON.parse(lastResStr));
      setSonglist(JSON.parse(lastResStr).data);
    }
    console.log("Feed useLayoutEffect hook ends");
    console.log(songlist);
  }, []);

  return (
    <>
      {console.log("start rendering, songlist: ", songlist)}
      <TextCard content={JSON.stringify(songlist)} />
      <SongList list={JSON.stringify(songlist)} />
      <ReactJkMusicPlayer mode="full" />
    </>
  );
}

export default Feed;