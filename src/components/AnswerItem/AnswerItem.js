import React from "react";
import classes from "./AnswerItem.module.css";

const AnswerItem = (props) => {
  const style = [classes.AnswerItem];
  if (props.styleState) {
    style.push(classes[props.styleState]);
  }
  return (
    <li
      className={style.join(" ")}
      onClick={() => props.onClick(props.value.id)}
    >
      <strong>{props.value.id}.</strong>&nbsp;
      <span>{props.value.options}</span>
    </li>
  );
};

export default AnswerItem;
