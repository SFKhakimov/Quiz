import React from "react";
import classes from "./AnswerList.module.css";
import AnswerItem from "../AnswerItem/AnswerItem";

const AnswerList = (props) => {
  return (
    <ul className={classes.AnswerList}>
      {props.options.map((answer, index) => {
        return (
          <AnswerItem
            value={answer}
            key={index}
            onClick={props.onClick}
            styleState={props.styleState ? props.styleState[answer.id] : null}
          />
        );
      })}
    </ul>
  );
};

export default AnswerList;
