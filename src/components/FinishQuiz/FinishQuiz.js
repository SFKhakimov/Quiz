import React from "react";
import classes from "./FinishQuiz.module.css";
import Button from "../UI/Button/Button";
import { NavLink } from "react-router-dom";

const FinishQuiz = (props) => {
  const resultsQuiz = Object.keys(props.resultsQuiz).reduce((total, index) => {
    if (props.resultsQuiz[index] === "success") {
      ++total;
    }
    return total;
  }, 0);
  return (
    <div className={classes.FinishQuiz}>
      <p>
        Правильных ответов: {resultsQuiz} из {props.quizLength}
      </p>
      <ul>
        {props.quiz.map((elem, index) => {
          return (
            <li key={elem + index}>
              <strong>{index + 1}.</strong>&nbsp;
              <span>{elem.question}</span>
              <i className={classes[props.resultsQuiz[index]]}></i>
            </li>
          );
        })}
      </ul>
      <div>
        <Button type="FinishQuiz_repeat" onClick={props.onClick}>
          Повторить
        </Button>
        <NavLink to="/">
          <Button type="FinishQuiz_all-test">Перейти ко всем тестам</Button>
        </NavLink>
      </div>
    </div>
  );
};

export default FinishQuiz;
