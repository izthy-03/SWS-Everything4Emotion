import React, { useState, useEffect } from "react";


const Feed = (props) => {

  const data = useState(sessionStorage.getItem("userData"));

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <>
      你好
    </>
  );
}

export default Feed;