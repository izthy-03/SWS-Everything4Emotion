import React, { useState, useEffect } from "react";
import { get, post, put } from "../utilities";
import TextCard from "../components/TextCard";

import "./Feed.css"
import "../utilities.css"

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
      post('http://127.0.0.1:8000/query/', body)
        .then(data => {
          // console.log(data); 
          setRes(data);
          sessionStorage.setItem("lastReq", bodyStr);
          sessionStorage.setItem("lastRes", JSON.stringify(data));
        })
        .catch((err) => { console.log(err) });
    }
    else {
      // setRes(JSON.parse(lastResStr));
      setRes(lastResStr);
    }
  }, []);

  return (
    <>
      <TextCard content={res} />
    </>
  );
}

export default Feed;