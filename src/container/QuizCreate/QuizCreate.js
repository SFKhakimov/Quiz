import React from "react";
import classes from "./QuizCreate.module.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Select from "../../components/UI/Select/Select";
import { connect } from "react-redux";
import {
  changeHandler,
  addAnswerHandler,
  selectChangeHandler,
  addQuiz,
  deleteHandler,
} from "../../redux/action/quizCreate";

const QiuizCreate = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const renderQuizList = () => {
    const quiz = props.quizList.map((quiz) => {
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
            onClick={(e) => props.deleteHandler(e, quiz.id)}
          >
            Удалить
          </Button>
        </div>
      );
    });
    return quiz;
  };

  const select = (
    <Select
      label="Выберете правильный ответ"
      onChange={props.selectChangeHandler}
      selected={props.correctAnswer}
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
        <form onSubmit={submitHandler}>
          {Object.keys(props.formElements).map((elem, index) => {
            const input = props.formElements[elem];
            return (
              <Input
                name={input.label}
                type={input.type}
                value={input.value}
                errorMessage={input.errorMessage}
                valid={input.valid}
                touched={input.touched}
                onChange={(event) => props.changeHandler(event, elem)}
                key={input + index}
              />
            );
          })}
          {select}
          <Button
            type="addanswer"
            onClick={props.addAnswerHandler}
            disabled={!props.formValid}
          >
            Добавить вопрос
          </Button>
          <Button
            type="createquiz"
            onClick={props.addQuiz}
            disabled={props.quizList.length === 0 ? true : false}
          >
            Создать тест
          </Button>
        </form>
        <div>{props.quizList !== 0 ? renderQuizList() : null}</div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    quizList: state.quizCreate.quizList,
    formValid: state.quizCreate.formValid,
    correctAnswer: state.quizCreate.correctAnswer,
    formElements: state.quizCreate.formElements,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeHandler: (e, inputName) => dispatch(changeHandler(e, inputName)),
    addAnswerHandler: () => dispatch(addAnswerHandler()),
    selectChangeHandler: (event) => dispatch(selectChangeHandler(event)),
    addQuiz: () => dispatch(addQuiz()),
    deleteHandler: (e, id) => dispatch(deleteHandler(e, id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QiuizCreate);
