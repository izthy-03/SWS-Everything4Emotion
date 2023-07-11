import React, { useState } from 'react';
import { Input } from 'antd';
import "./AnyText.css"

const { TextArea } = Input;

const AnyText = () => {
  const [value, setValue] = useState("");

  // called when input modified
  const handleChange = (event) => {
    setValue(event.target.value)
    console.log(value);
  }


  return (
    <div className="AnyText-container">
      <p>AnyThing comes up to your mind right now</p>
      <TextArea
        rows={5}
        placeholder="maxLength is 6000"
        maxLength={6000}
        onChange={handleChange}
        style={{ width: 800, }} />
    </div>
  );
}

export default AnyText;