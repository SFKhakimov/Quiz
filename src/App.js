import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import Quiz from "../src/container/Quiz/Quiz";

export default class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Quiz />
        </Layout>
      </div>
    );
  }
}
