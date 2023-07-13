import React, { useState } from "react";
import { Button } from "antd";
import { Link } from "@reach/router";

/**
 * Submit is a button to submit all the input to the backend
 *
 * Proptypes
 * @param {() => void} onSubmit: (function) triggered when clicked
 */
const Submit = (props) => {

  // called when submitting
  const handleSubmit = () => {
    props.onSubmit();
  }

  return (
    <div>
      <Button
        type="primary"
        size="large"
        onClick={handleSubmit}>

        <Link to="/feed">
          Submit
        </Link>
      </Button>
    </div>
  );
}

export default Submit;