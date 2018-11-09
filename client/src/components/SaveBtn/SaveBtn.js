import React from "react";
import API from "../../utils/API";
import "./SaveBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const SaveBtn = props => (
  <span className="save-btn" {...props}>
  
    SAVE

  </span>
);

export default SaveBtn;
