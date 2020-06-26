import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  const cls = [classes.Button, classes[props.style]];
  return (
    <button
      className={cls.join(" ")}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
