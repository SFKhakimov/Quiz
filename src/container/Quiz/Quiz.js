import React, { useEffect } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishQuiz from "../../components/FinishQuiz/FinishQuiz";
import Loader from "../../components/UI/Loader/Loader";
import axios from "axios";
import { connect } from "react-redux";
import {
  handleClick,
  repeat,
  fetchQuizStart,
  fetchQuizError,
  fetchQuizSetState,
} from "../../redux/action/quiz";

const Quiz = (props) => {
  const { fetchQuizSetState, fetchQuizError, fetchQuizStart } = props;

  useEffect(() => {
    fetchQuizStart();
    async function fetchQuiz() {
      try {
        const res = await axios.get(
          `https://quiz-39d4e.firebaseio.com/quiz/${props.match.params.id}.json`
        );
        const quiz = res.data;
        fetchQuizSetState(quiz);
      } catch (err) {
        fetchQuizError(err);
      }
    }
    fetchQuiz();
  }, [
    fetchQuizSetState,
    fetchQuizError,
    fetchQuizStart,
    props.match.params.id,
  ]);

  return (
    <div className={classes.Quiz}>
      <h1>Ответьте на все вопросы</h1>
      {props.loading ? (
        <Loader />
      ) : (
        <div>
          {props.currentQuestion === props.quiz.length ? (
            <FinishQuiz
              quizLength={props.quiz.length}
              resultsQuiz={props.resultsQuiz}
              quiz={props.quiz}
              onClick={props.repeat}
            />
          ) : (
            <ActiveQuiz
              value={props.quiz[props.currentQuestion]}
              onClick={props.handleClick}
              styleState={props.optionsAnswer}
              quizLength={props.quiz.length}
              currentQuestion={props.currentQuestion + 1}
            />
          )}
        </div>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    resultsQuiz: state.quiz.resultsQuiz,
    optionsAnswer: state.quiz.optionsAnswer,
    currentQuestion: state.quiz.currentQuestion,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
  };
}

function mapDispathToProps(dispatch) {
  return {
    handleClick: (answerId) => dispatch(handleClick(answerId)),
    repeat: () => dispatch(repeat()),
    fetchQuizSetState: (quiz) => dispatch(fetchQuizSetState(quiz)),
    fetchQuizStart: () => dispatch(fetchQuizStart()),
    fetchQuizError: (err) => dispatch(fetchQuizError(err)),
  };
}

export default connect(mapStateToProps, mapDispathToProps)(Quiz);
