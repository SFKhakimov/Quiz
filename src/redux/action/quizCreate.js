import { checkValidate } from "../../utils/form/form";
import axios from "axios";
import {
  FORM_ELEMENTS_SET_STATE,
  ADD_ANSWER_SET_STATE,
  SELECT_SET_STATE,
  ADD_QUIZ_SET_STATE,
  DELETE_SET_STATE,
} from "./actionTypes";
import { createFormQuesion } from "../../utils/quiz-creator/quiz-creator";

export function changeHandler(e, inputName) {
  return (dispatch, getState) => {
    const state = getState().quizCreate;
    const form = { ...state.formElements };
    const input = { ...state.formElements[inputName] };

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
    dispatch(quizCreateSetState(form, formValid));
  };
}

export function quizCreateSetState(form, formValid) {
  return {
    type: FORM_ELEMENTS_SET_STATE,
    formElements: form,
    formValid,
  };
}

export function addAnswerHandler() {
  return (dispatch, getState) => {
    const state = getState().quizCreate;
    const quizList = state.quizList.concat();
    const { question, answer1, answer2, answer3, answer4 } = state.formElements;
    const creaeQuiz = {
      id: question.id,
      correctAnswer: state.correctAnswer,
      question: question.value,
      answer: [
        { options: answer1.value, id: 1 },
        { options: answer2.value, id: 2 },
        { options: answer3.value, id: 3 },
        { options: answer4.value, id: 4 },
      ],
    };
    quizList.push(creaeQuiz);
    dispatch(addAnswerHandlerSetState(quizList, createFormQuesion()));
  };
}

export function addAnswerHandlerSetState(quizList, createForm) {
  return {
    type: ADD_ANSWER_SET_STATE,
    quizList,
    formElements: createForm,
  };
}

export function selectChangeHandler(event) {
  return (dispatch) => {
    const value = +event.target.value;
    dispatch(selectHandlerSetState(value));
  };
}

export function selectHandlerSetState(value) {
  return {
    type: SELECT_SET_STATE,
    correctAnswer: value,
  };
}

export function addQuiz() {
  return async (dispatch, getState) => {
    const state = getState().quizCreate;
    try {
      await axios.post(
        "https://quiz-39d4e.firebaseio.com/quiz.json",
        state.quizList
      );
      const quizList = [];
      const formValid = false;
      const correctAnswer = 1;
      const formElements = createFormQuesion();
      dispatch(
        addQuizSetState(quizList, formValid, correctAnswer, formElements)
      );
    } catch (err) {
      console.log(err);
    }
  };
}

export function addQuizSetState(
  quizList,
  formValid,
  correctAnswer,
  formElements
) {
  return {
    type: ADD_QUIZ_SET_STATE,
    quizList,
    formValid,
    correctAnswer,
    formElements,
  };
}

export function deleteHandler(e, id) {
  return (dispatch, getState) => {
    const state = getState().quizCreate;
    const quizList = state.quizList.concat();
    const newQuizList = quizList.filter((elem) => id !== elem.id);
    dispatch(deleteHandlerSetState(newQuizList));
  };
}

export function deleteHandlerSetState(newQuizList) {
  return {
    type: DELETE_SET_STATE,
    quizList: newQuizList,
  };
}
