import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import Quiz from "./container/Quiz/Quiz";
import Auth from "./container/Auth/Auth";
import QuizCreate from "./container/QuizCreate/QuizCreate";
import { Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path="/" exact>
            <Quiz />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/create-quiz">
            <QuizCreate />
          </Route>
        </Layout>
      </div>
    );
  }
}
