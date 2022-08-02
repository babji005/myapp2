import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
import React, { Component } from "react";

export default class App extends Component {
  componentDidMount() {
    console.log("mounted calculator!");
  }

  render() {
    return (
      <div>
        <Main />
        {/* <Function /> */}
        {/* <Front/> */}
        {/* <Card/> */}

      </div>
    );
  }
}
