import React, { useState } from "react";
import { Button } from "antd";

const Submit = () => {

  // called when submitting
  const handleSubmit = () => {

  }

  return (
    <div>
      <Button
        type="primary"
        size="large"
        onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

export default Submit;