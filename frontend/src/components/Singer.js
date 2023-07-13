import React, { useState } from "react";
import Input from "antd/es/input/Input";

/**
 * Singer is a text input for users to type in the singer they prefer
 *
 * Proptypes
 * @param {(singer) => void} onChange: (function) triggered when singer is modified, takes text as parameters
 */
const Singer = (props) => {

  // called when input modified
  const handleChange = (event) => {
    // console.log(value);
    props.onChange(event.target.value);
  }

  return (
    <div>
      <p>The singer you are interested in</p>
      <Input placeholder="singer" onChange={handleChange} style={{ width: 250, }} />
    </div>
  );
}

export default Singer;