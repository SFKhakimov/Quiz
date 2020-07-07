import {
  FORM_ELEMENTS_SET_STATE,
  ADD_ANSWER_SET_STATE,
  SELECT_SET_STATE,
  ADD_QUIZ_SET_STATE,
  DELETE_SET_STATE,
} from "../action/actionTypes";
import { createFormQuesion } from "../../utils/quiz-creator/quiz-creator";

const initialState = {
  quizList: [],
  formValid: false,
  correctAnswer: 1,
  formElements: createFormQuesion(),
  error: null,
};

export default function quizCreateReducer(state = initialState, action) {
  switch (action.type) {
    case FORM_ELEMENTS_SET_STATE:
      return {
        ...state,
        formElements: action.formElements,
        formValid: action.formValid,
      };
    case ADD_ANSWER_SET_STATE:
      return {
        ...state,
        quizList: action.quizList,
        formElements: action.formElements,
        correctAnswer: 1,
        formValid: false,
      };
    case SELECT_SET_STATE:
      return { ...state, correctAnswer: action.correctAnswer };
    case ADD_QUIZ_SET_STATE:
      return {
        ...state,
        quizList: action.quizList,
        formValid: action.formValid,
        correctAnswer: action.correctAnswer,
        formElements: action.formElements,
      };
    case DELETE_SET_STATE:
      return {
        ...state,
        quizList: action.quizList,
      };
    default:
      return state;
  }
}
