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

  useEffect(() => {
    console.log(props.content);
  }, []);

  return (
    <div className="TextCard-container">
      <Card
        style={{
          width: 800,
        }}
      >
        {props.content.split('\n').map((line) => (<p>{line}</p>))}
      </Card>

    </div>

  );
}
export default TextCard;