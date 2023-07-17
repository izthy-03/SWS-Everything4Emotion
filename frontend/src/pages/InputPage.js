import React, { useEffect, useState } from "react";
import MoodList from "../components/MoodList";
import SongPeriod from "../components/SongPeriod";
import Singer from "../components/Singer";
import AnyText from "../components/AnyText";
import Submit from "../components/Submit";
import NavBar from "../components/NavBar";

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
    sessionStorage.setItem("request", JSON.stringify(body));

  }

  useEffect(() => {

  }, [mood, period, singer, text]);

  return (
    <div>
      <NavBar />
      <MoodList onChange={setMood} />
      <SongPeriod onChange={setPeriod} />
      <Singer onChange={setSinger} />
      <AnyText onChange={setText} />
      <Submit onSubmit={handleSubmit} />
    </div>

  );
}
export default InputPage;