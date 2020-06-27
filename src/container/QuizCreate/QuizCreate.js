import React, { Component } from "react";
import classes from "./QuizCreate.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Select from "../../components/UI/Select/Select";
import { createFormQuesion } from "../../utils/quiz-creator/quiz-creator";
import { checkValidate } from "../../utils/form/form";
import axios from "axios";

export default class QiuizCreate extends Component {
  state = {
    quizList: [],
    formValid: false,
    correctAnswer: 1,
    formElements: createFormQuesion(),
  };

  changeHandler = (e, inputName) => {
    const form = { ...this.state.formElements };
    const input = { ...this.state.formElements[inputName] };

    input.touched = true;
    input.value = e.target.value;
    input.valid = checkValidate(input.value, input.validity);

    form[inputName] = input;

    let formValid = true;
    Object.keys(form).forEach((elem) => {
      const value = form[elem];
      if (formValid) {
        formValid = value.valid && formValid;
      }
      return formValid;
    });

    this.setState(() => {
      return {
        formElements: form,
        formValid,
      };
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
  };

  addAnswerHandler = () => {
    const quizList = this.state.quizList.concat();
    const {
      question,
      answer1,
      answer2,
      answer3,
      answer4,
    } = this.state.formElements;
    const creaeQuiz = {
      id: question.id,
      correctAnswer: this.state.correctAnswer,
      question: question.value,
      answer: [
        { options: answer1.value, id: 1 },
        { options: answer2.value, id: 2 },
        { options: answer3.value, id: 3 },
        { options: answer4.value, id: 4 },
      ],
    };
    quizList.push(creaeQuiz);
    this.setState(() => {
      return {
        quizList,
        formElements: createFormQuesion(),
        correctAnswer: 1,
        formValid: false,
      };
    });
  };

  selectChangeHandler = (event) => {
    const value = +event.target.value;
    this.setState(() => {
      return {
        correctAnswer: value,
      };
    });
  };

  addQuiz = async () => {
    try {
      await axios.post(
        "https://quiz-39d4e.firebaseio.com/quiz.json",
        this.state.quizList
      );
      this.setState(() => {
        return {
          quizList: [],
          formValid: false,
          correctAnswer: 1,
          formElements: createFormQuesion(),
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  deleteHandler = (e, id) => {
    const quizList = this.state.quizList.concat();
    const newQuizList = quizList.filter((elem) => id !== elem.id);
    this.setState(() => {
      return {
        quizList: newQuizList,
      };
    });
  };

  renderQuizList = () => {
    const quiz = this.state.quizList.map((quiz) => {
      return (
        <div className={classes.Quiz} key={quiz.id}>
          <p>Ваш вопрос: {quiz.question}</p>
          <p>Правильный ответ: {quiz.correctAnswer}</p>
          <ul>
            {quiz.answer.map((answer) => {
              return (
                <li key={answer.id}>
                  {answer.id}. {answer.options}
                </li>
              );
            })}
          </ul>
          <Button
            type="addanswer"
            onClick={(e) => this.deleteHandler(e, quiz.id)}
          >
            Удалить
          </Button>
        </div>
      );
    });
    return quiz;
  };

  render() {
    const select = (
      <Select
        label="Выберете правильный ответ"
        onChange={this.selectChangeHandler}
        selected={this.state.correctAnswer}
        options={{
          value1: 1,
          value2: 2,
          value3: 3,
          value4: 4,
        }}
      />
    );
    return (
      <div className={classes.QiuizCreate}>
        <div>
          <h2>Создание теста</h2>
          <form onSubmit={this.submitHandler}>
            {Object.keys(this.state.formElements).map((elem, index) => {
              const input = this.state.formElements[elem];
              return (
                <Input
                  name={input.label}
                  type={input.type}
                  value={input.value}
                  errorMessage={input.errorMessage}
                  valid={input.valid}
                  touched={input.touched}
                  onChange={(event) => this.changeHandler(event, elem)}
                  key={input + index}
                />
              );
            })}
            {select}
            <Button
              type="addanswer"
              onClick={this.addAnswerHandler}
              disabled={!this.state.formValid}
            >
              Добавить вопрос
            </Button>
            <Button
              type="createquiz"
              onClick={this.addQuiz}
              disabled={!this.state.formValid}
            >
              Создать тест
            </Button>
          </form>
          <div>{this.state.quizList !== 0 ? this.renderQuizList() : null}</div>
        </div>
      </div>
    );
  }
}
