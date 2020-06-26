import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishQuiz from "../../components/FinishQuiz/FinishQuiz";

export default class Quiz extends Component {
  state = {
    resultsQuiz: {},
    optionsAnswer: null, // success или error
    currentQuestion: 0,
    quiz: [
      {
        id: 1,
        correctAnswer: 3,
        question: "В каком году основали Москву?",
        answer: [
          { options: "1084г", id: 1 },
          { options: "1094г", id: 2 },
          { options: "1147г", id: 3 },
          { options: "1244г", id: 4 },
        ],
      },
      {
        id: 2,
        correctAnswer: 2,
        question: "Кто освободил Русь от Монголов?",
        answer: [
          { options: "Иван Купала", id: 1 },
          { options: "Иван Грозный", id: 2 },
          { options: "Артем Великий", id: 3 },
          { options: "Святослав Всеволодович ", id: 4 },
        ],
      },
    ],
  };

  handleClick = (answerId) => {
    if (this.state.optionsAnswer) {
      const key = Object.keys(this.state.optionsAnswer)[0];
      if (this.state.optionsAnswer[key] === "success" || "error") {
        return;
      }
    }

    const question = this.state.quiz[this.state.currentQuestion];
    const result = { ...this.state.resultsQuiz };

    if (answerId === question.correctAnswer) {
      result[this.state.currentQuestion] = "success";
      this.setState(() => {
        return {
          optionsAnswer: { [answerId]: "success" },
          resultsQuiz: result,
        };
      });
    } else {
      result[this.state.currentQuestion] = "error";
      this.setState(() => {
        return {
          optionsAnswer: { [answerId]: "error" },
          resultsQuiz: result,
        };
      });
    }

    const timeout = setTimeout(() => {
      this.setState((state) => {
        return {
          currentQuestion: state.currentQuestion + 1,
          optionsAnswer: null,
        };
      });
      window.setTimeout(timeout);
    }, 1000);
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <h1>Ответьте на все вопросы</h1>
        <div>
          {this.state.currentQuestion === this.state.quiz.length ? (
            <FinishQuiz
              quizLength={this.state.quiz.length}
              resultsQuiz={this.state.resultsQuiz}
              quiz={this.state.quiz}
            />
          ) : (
            <ActiveQuiz
              value={this.state.quiz[this.state.currentQuestion]}
              onClick={this.handleClick}
              styleState={this.state.optionsAnswer}
              quizLength={this.state.quiz.length}
              currentQuestion={this.state.currentQuestion + 1}
            />
          )}
        </div>
      </div>
    );
  }
}
