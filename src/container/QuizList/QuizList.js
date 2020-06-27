import React, { Component } from "react";
import classes from "./QuizList.module.css";
import Loader from "../../components/UI/Loader/Loader";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default class QuizList extends Component {
  state = {
    quizList: [],
    loading: true,
  };

  async componentDidMount() {
    try {
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
      this.setState(() => {
        return {
          quizList,
          loading: false,
        };
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        {this.state.loading ? (
          <Loader />
        ) : (
          <div>
            <h2>Список тестов</h2>
            <ul>
              {this.state.quizList.map((quiz) => {
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
  }
}
