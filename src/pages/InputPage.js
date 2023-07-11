import React, { useEffect, useState } from "react";
import MoodList from "../components/MoodList";
import SongPeriod from "../components/SongPeriod";
import Singer from "../components/Singer";
import AnyText from "../components/AnyText";
import Submit from "../components/Submit";

const InputPage = () => {

  const [mood, setMood] = useState("");
  const [period, setPeriod] = useState([]);
  const [singer, setSinger] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    console.log(mood);
    console.log(period);
    console.log(singer);
    console.log(text);
    console.log("========================");
  }, [mood, period, singer, text]);

  return (
    <div>
      <MoodList onChange={setMood} />
      <SongPeriod onChange={setPeriod} />
      <Singer onChange={setSinger} />
      <AnyText onChange={setText} />
      <Submit />
    </div>

  );
}
export default InputPage;