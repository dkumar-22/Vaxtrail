import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import App from "./App";
import SignIn from "./SignIn"
import Hospitals from "./Hospitals";
import Topbar from "./Topbar";
import Checkout from "./Checkout"
function Main() {
  return (
    <Router>
      <div>
        <Topbar />
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/login" exact component={SignIn} />
          <Route path="/hospitals" exact component={Hospitals} />
          <Route path="/register" exact component={Checkout} />
        </Switch>
      </div>
    </Router>
  );
}

export default Main;
