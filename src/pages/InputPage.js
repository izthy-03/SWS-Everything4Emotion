import React from "react";
import MoodList from "../components/MoodList";
import SongPeriod from "../components/SongPeriod";
import Singer from "../components/Singer";
import AnyText from "../components/AnyText";

const InputPage = () => {

  return (
    <div>
      <MoodList />
      <SongPeriod />
      <Singer />
      <AnyText />
    </div>

  );
}
export default InputPage;