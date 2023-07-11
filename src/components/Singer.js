import React, { useState } from "react";
import Input from "antd/es/input/Input";

const Singer = () => {
  const [value, setValue] = useState("");

  // called when input modified
  const handleChange = (event) => {
    setValue(event.target.value)
    console.log(value);
  }

  return (
    <div>
      <p>The singer you are interested in</p>
      <Input placeholder="singer" onChange={handleChange} style={{ width: 250, }} />
    </div>
  );
}

export default Singer;