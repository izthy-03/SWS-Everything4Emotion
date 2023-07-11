import React, { useState } from "react";
import { Radio } from "antd";

import happy from "../assets/happy.png"
import confused from "../assets/confused.png"
import proud from '../assets/proud.png'
import relaxed from '../assets/relaxed.png'
import unamused from '../assets/unamused.png'

import "./MoodList.css"

/**
 * MoodList contains all the moods for user to choose
 *
 * Proptypes
 * @param {(mood) => void} onChange: (function) triggered when choice changes, takes mood as parameters
 */
const MoodList = (props) => {

  // called when mood changed
  const handleChange = (event) => {
    // console.log(event.target.value);
    props.onChange(event.target.value);
  }

  return (
    <div>
      <p>Choose your mood now</p>
      <Radio.Group defaultValue="null" size="large" onChange={handleChange} style={{ marginTop: 0, }}>
        <Radio.Button value="happy" style={{ width: 150, height: 180 }}>
          <img src={happy} />
          happy
        </Radio.Button>
        <Radio.Button value="confused" style={{ width: 150, height: 180 }}>
          <img src={confused} />
          confused
        </Radio.Button>
        <Radio.Button value="proud" style={{ width: 150, height: 180 }}>
          <img src={proud} />
          proud
        </Radio.Button>
        <Radio.Button value="relaxed" style={{ width: 150, height: 180 }}>
          <img src={relaxed} />
          relaxed
        </Radio.Button>
        <Radio.Button value="unamused" style={{ width: 150, height: 180 }}>
          <img src={unamused} />
          unamused
        </Radio.Button>
      </Radio.Group>
    </div >
  );
}

export default MoodList;