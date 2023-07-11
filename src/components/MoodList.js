import React from "react";
import { Radio } from "antd";

import happy from "../assets/happy.png"
import confused from "../assets/confused.png"
import proud from '../assets/proud.png'
import relaxed from '../assets/relaxed.png'
import unamused from '../assets/unamused.png'


import "./MoodList.css"

const MoodList = () => {
  return (
    <div>
      <p>Choose your mood now</p>
      <img src={happy} />
      <img src={confused} />
      <img src={proud} />
      <img src={relaxed} />
      <img src={unamused} />
      <p>
        <Radio.Group defaultValue="a" size="large" style={{ marginTop: 0, }}>
          <Radio.Button value="a">happy</Radio.Button>
          <Radio.Button value="b">confused</Radio.Button>
          <Radio.Button value="c">proud</Radio.Button>
          <Radio.Button value="d">relaxed</Radio.Button>
          <Radio.Button value="e">unamused</Radio.Button>
        </Radio.Group>
      </p>
    </div>
  );
}

export default MoodList;