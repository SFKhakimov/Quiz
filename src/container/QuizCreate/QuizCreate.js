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
    quiz: [],
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

    this.setState(() => {
      return {
        formElements: form,
      };
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
  };

  addAnswerHandler = () => {
    const quiz = this.state.quiz.concat();
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
    quiz.push(creaeQuiz);
    this.setState(() => {
      return {
        quiz,
        formElements: createFormQuesion(),
        correctAnswer: null,
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
        this.state.quiz
      );
      this.setState(() => {
        return {
          quiz: [],
          formValid: false,
          correctAnswer: null,
          formElements: createFormQuesion(),
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const select = (
      <Select
        label="Выберете правильный ответ"
        onChange={this.selectChangeHandler}
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
            <Button type="addanswer" onClick={this.addAnswerHandler}>
              Добавить вопрос
            </Button>
            <Button type="createquiz" onClick={this.addQuiz}>
              Создать тест
            </Button>
          </form>
          <div></div>
        </div>
      </div>
    );
  }
}
