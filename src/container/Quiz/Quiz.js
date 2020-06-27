import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishQuiz from "../../components/FinishQuiz/FinishQuiz";
import Loader from "../../components/UI/Loader/Loader";
import axios from "axios";

export default class Quiz extends Component {
  state = {
    resultsQuiz: {},
    optionsAnswer: null,
    currentQuestion: 0,
    quiz: [],
    loading: true,
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

  repeat = () => {
    this.setState(() => {
      return {
        currentQuestion: 0,
      };
    });
  };

  async componentDidMount() {
    try {
      const res = await axios.get(
        `https://quiz-39d4e.firebaseio.com/quiz/${this.props.match.params.id}.json`
      );
      const quiz = res.data;
      this.setState(() => {
        return {
          quiz,
          loading: false,
        };
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <h1>Ответьте на все вопросы</h1>
        {this.state.loading ? (
          <Loader />
        ) : (
          <div>
            {this.state.currentQuestion === this.state.quiz.length ? (
              <FinishQuiz
                quizLength={this.state.quiz.length}
                resultsQuiz={this.state.resultsQuiz}
                quiz={this.state.quiz}
                onClick={this.repeat}
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
        )}
      </div>
    );
  }
}
