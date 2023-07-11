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
      <p>
        <Radio.Group defaultValue="a" size="large" style={{ marginTop: 0, }}>
          <Radio.Button value="a" style={{ width: 150, height: 180 }}>
            <img src={happy} />
            happy
          </Radio.Button>
          <Radio.Button value="b" style={{ width: 150, height: 180 }}>
            <img src={confused} />
            confused
          </Radio.Button>
          <Radio.Button value="c" style={{ width: 150, height: 180 }}>
            <img src={proud} />
            proud
          </Radio.Button>
          <Radio.Button value="d" style={{ width: 150, height: 180 }}>
            <img src={relaxed} />
            relaxed
          </Radio.Button>
          <Radio.Button value="e" style={{ width: 150, height: 180 }}>
            <img src={unamused} />
            unamused
          </Radio.Button>
        </Radio.Group>
      </p>
    </div >
  );
}

export default MoodList;