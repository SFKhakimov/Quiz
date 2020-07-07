import { combineReducers } from "redux";
import quizListReducer from "./quizList";
import quizReducer from "./quiz";
import quizCreateReducer from "./quizCreate";

export default combineReducers({
  quizList: quizListReducer,
  quiz: quizReducer,
  quizCreate: quizCreateReducer,
});
