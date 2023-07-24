import React, { useState, useEffect } from 'react';
import { Card } from 'antd';

import "./TextCard.css"
import "../utilities.css"

/**
 * TextCard is a text output container from chatGPT 
 *
 * Proptypes
 * @param {string} content: text
 */
const TextCard = (props) => {

  const [text, setText] = useState("");

  useEffect(() => {
    console.log(props.content);
    let content = props.content;
    setText(content === null ? "" : content);
  }, []);

  return (
    <div className="TextCard-container">
      <Card
        style={{
          width: 800,
        }}
      >
        {/* {props.content !== null ?
          props.content.split('\n').map((line) => (<p>{line}</p>))
          : ""} */}
        {/* {props.content} */}
        Songs recommended for you
      </Card>

    </div>

  );
}
export default TextCard;