import React, { useEffect } from "react";
import classes from "./QuizList.module.css";
import Loader from "../../components/UI/Loader/Loader";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchQuizListStart,
  fetchQuizListEnd,
  fetchQuizListError,
} from "../../redux/action/quizList";
import axios from "axios";

const QuizList = (props) => {
  const { fetchQuizListStart, fetchQuizListEnd, fetchQuizListError } = props;

  useEffect(() => {
    async function fetchQuizList() {
      try {
        fetchQuizListStart();
        const res = await axios.get(
          "https://quiz-39d4e.firebaseio.com/quiz.json"
        );
        const quizList = [];
        Object.keys(res.data).forEach((elem, index) => {
          quizList.push({
            id: elem,
            name: `Тест №${index + 1}`,
          });
        });
        fetchQuizListEnd(quizList);
      } catch (err) {
        fetchQuizListError(err);
      }
    }
    fetchQuizList();
  }, [fetchQuizListStart, fetchQuizListEnd, fetchQuizListError]);
  return (
    <div className={classes.QuizList}>
      {props.loading ? (
        <Loader type="position" />
      ) : (
        <div>
          <h2>Список тестов</h2>
          <ul>
            {props.quizList.map((quiz) => {
              return (
                <li key={quiz.id}>
                  <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    quizList: state.quizList.quizList,
    loading: state.quizList.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizListStart: () => dispatch(fetchQuizListStart()),
    fetchQuizListEnd: (quizList) => dispatch(fetchQuizListEnd(quizList)),
    fetchQuizListError: (err) => dispatch(fetchQuizListError(err)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
