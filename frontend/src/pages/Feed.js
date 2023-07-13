import React, { useState, useEffect } from "react";

import { get, post, put } from "../utilities";

const Feed = () => {

  const [res, setRes] = useState({});
  const [req, setReq] = useState({});

  useEffect(() => {

    let body = JSON.parse(sessionStorage.getItem("request"));
    console.log("lastReq:\n" + req);
    console.log("nowReq:\n" + body);

    if (body !== req) {
      setReq(body);
      post('http://127.0.0.1:8000/query/', body)
        .then(data => {
          console.log(data);
          setRes(data);
        })
        .catch((err) => { console.log(err) });
    }
  }, []);

  return (
    <>
      <span>
        {res}
      </span>
    </>
  );
}

export default Feed;