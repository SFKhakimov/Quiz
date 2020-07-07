import {
  FETCH_QUIZLIST_START,
  FETCH_QUIZLIST_END,
  FETCH_QUIZLIST_ERROR,
} from "./actionTypes";

export function fetchQuizListStart() {
  return {
    type: FETCH_QUIZLIST_START,
  };
}
export function fetchQuizListEnd(quizList) {
  return {
    type: FETCH_QUIZLIST_END,
    payload: quizList,
  };
}

export function fetchQuizListError(error) {
  return {
    type: FETCH_QUIZLIST_ERROR,
    payload: error,
  };
}
