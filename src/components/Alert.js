import React from "react";

export const Alert = ({ type, text }) => {
  return <div className={`alert alert-${type}`}>{text}</div>; //css me alert-success and alert-danger ke naam se classname hai jisme alag
  //alag colours hai to isiliye humne yha pe paas kia hai unhe
  // ye smjh ni aaya zyaada mujhe
};

export default Alert;
