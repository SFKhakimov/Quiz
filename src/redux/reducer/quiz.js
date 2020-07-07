import {
  QUIZ_END,
  QUIZ_SET_STATE,
  FETCH_QUIZ_ERROR,
  FETCH_QUIZ_SET_STATE,
  QUIZ_REPEAT,
  FETCH_QUIZ_START,
} from "../action/actionTypes";

const initialState = {
  resultsQuiz: {},
  optionsAnswer: null,
  currentQuestion: 0,
  quiz: [],
  loading: true,
  error: null,
};

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case QUIZ_SET_STATE:
      return {
        ...state,
        optionsAnswer: action.optionsAnswer,
        resultsQuiz: action.resultsQuiz,
      };
    case QUIZ_END:
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        optionsAnswer: null,
      };
    case FETCH_QUIZ_SET_STATE:
      return { ...state, quiz: action.quiz, loading: false };
    case FETCH_QUIZ_ERROR:
      return { ...state, error: action.error };
    case QUIZ_REPEAT:
      return { ...state, currentQuestion: 0 };
    case FETCH_QUIZ_START:
      return { ...state, quiz: [], currentQuestion: 0, loading: true };
    default:
      return state;
  }
}
