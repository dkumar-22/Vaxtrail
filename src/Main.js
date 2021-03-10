import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import App from "./App";
import Register from "./Register";
import Login from "./Login";
function Main() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/login" exact component={() => <Login />} />
          <Route path="/register" exact component={() => <Register />} />
        </Switch>
      </div>
    </Router>
  );
}

export default Main;
