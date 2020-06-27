import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import Quiz from "./container/Quiz/Quiz";
import Auth from "./container/Auth/Auth";
import QuizCreate from "./container/QuizCreate/QuizCreate";
import QuizList from "./container/QuizList/QuizList";
import { Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path="/" exact component={QuizList} />
          {/* <Route path="/auth" component={Auth} /> */}
          <Route path="/create-quiz" component={QuizCreate} />
          <Route path="/quiz/:id" component={Quiz} />
        </Layout>
      </div>
    );
  }
}
