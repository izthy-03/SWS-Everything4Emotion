import React, { useState } from 'react';
import { Input } from 'antd';
import "./AnyText.css"

const { TextArea } = Input;

/**
 * AnyText is a text input for user to type in anything
 *
 * Proptypes
 * @param {(text) => void} onChange: (function) triggered when text is modified, takes text as parameters
 */
const AnyText = (props) => {

  // called when input modified
  const handleChange = (event) => {
    // console.log(value);
    props.onChange(event.target.value);
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