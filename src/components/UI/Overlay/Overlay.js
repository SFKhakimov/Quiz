import React from "react";
import classes from "./Overlay.module.css";

const Overlay = (props) => (
  <div className={classes.Overlay} onClick={props.onClick}></div>
);

export default Overlay;
