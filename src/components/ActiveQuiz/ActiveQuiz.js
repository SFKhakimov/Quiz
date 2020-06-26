import React from "react";
import classes from "./ActiveQuiz.module.css";
import AnswerList from "../AnswerList/AnswerList";

const ActiveQuiz = (props) => {
  return (
    <div className={classes.ActiveQuiz}>
      <div>
        <h2>{props.value.question}</h2>
        <p>
          {props.currentQuestion} из {props.quizLength}
        </p>
      </div>
      <AnswerList
        options={props.value.answer}
        onClick={props.onClick}
        styleState={props.styleState}
      />
    </div>
  );
};

export default ActiveQuiz;
