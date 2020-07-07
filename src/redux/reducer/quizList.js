import {
  FETCH_QUIZLIST_START,
  FETCH_QUIZLIST_END,
  FETCH_QUIZLIST_ERROR,
} from "../action/actionTypes";

const initialState = {
  quizList: [],
  loading: true,
  error: null,
};

export default function quizListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZLIST_START:
      return { ...state, error: null, loading: true };
    case FETCH_QUIZLIST_END:
      return { ...state, quizList: action.payload, loading: false };
    case FETCH_QUIZLIST_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
