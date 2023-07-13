import React, { useEffect, useState } from "react";
import MoodList from "../components/MoodList";
import SongPeriod from "../components/SongPeriod";
import Singer from "../components/Singer";
import AnyText from "../components/AnyText";
import Submit from "../components/Submit";
import { get, post, put } from "../utilities";
import { Link } from "@reach/router";


const InputPage = () => {

  const [mood, setMood] = useState("");
  const [period, setPeriod] = useState([]);
  const [singer, setSinger] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = () => {
    let body = {
      mood: mood,
      period: period,
      singer: singer,
      text: text
    };
    console.log(JSON.stringify(body));
    console.log("========================");

    post('https://localhost:8000/query/', body)
      .then(data => {
        console.log(data);
        sessionStorage.setItem("userData", data);
      })
      .catch((err) => { console.log(err) });

  }

  useEffect(() => {

  }, [mood, period, singer, text]);

  return (
    <div>
      <MoodList onChange={setMood} />
      <SongPeriod onChange={setPeriod} />
      <Singer onChange={setSinger} />
      <AnyText onChange={setText} />
      <Submit onSubmit={handleSubmit} />
    </div>

  );
}
export default InputPage;