import React from "react";
import classes from "./FinishQuiz.module.css";
import Button from "../UI/Button/Button";

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
        <Button type="FinishQuiz_repeat">Повторить</Button>
        <Button type="FinishQuiz_all-test">Перейти ко всем тестам</Button>
      </div>
    </div>
  );
};

export default FinishQuiz;
