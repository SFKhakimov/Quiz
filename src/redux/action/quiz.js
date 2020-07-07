import {
  QUIZ_END,
  QUIZ_SET_STATE,
  FETCH_QUIZ_SET_STATE,
  FETCH_QUIZ_ERROR,
  QUIZ_REPEAT,
  FETCH_QUIZ_START,
} from "./actionTypes";

export function handleClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;
    if (state.optionsAnswer) {
      const key = Object.keys(this.state.optionsAnswer)[0];
      if (state.optionsAnswer[key] === "success" || "error") {
        return;
      }
    }

    const question = state.quiz[state.currentQuestion];
    const resultsQuiz = { ...state.resultsQuiz };

    if (answerId === question.correctAnswer) {
      resultsQuiz[state.currentQuestion] = "success";
      dispatch(quizSetState({ [answerId]: "success" }, resultsQuiz));
    } else {
      resultsQuiz[state.currentQuestion] = "error";
      dispatch(quizSetState({ [answerId]: "error" }, resultsQuiz));
    }

    const timeout = setTimeout(() => {
      dispatch(quizEnd());
      window.setTimeout(timeout);
    }, 1000);
  };
}

export function quizSetState(optionsAnswer, resultsQuiz) {
  return {
    type: QUIZ_SET_STATE,
    optionsAnswer,
    resultsQuiz,
  };
}

export function quizEnd() {
  return {
    type: QUIZ_END,
  };
}

export function fetchQuizSetState(quiz) {
  return {
    type: FETCH_QUIZ_SET_STATE,
    quiz,
  };
}
export function fetchQuizError(error) {
  return {
    type: FETCH_QUIZ_ERROR,
    error,
  };
}

export function fetchQuizStart() {
  return {
    type: FETCH_QUIZ_START,
  };
}

export function repeat() {
  return {
    type: QUIZ_REPEAT,
  };
}
