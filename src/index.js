import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./Main";
import { DataLayer } from "./DataLayer";
import reducer, { initialState } from "./reducer";
ReactDOM.render(
  <DataLayer initialState={initialState} reducer={reducer}>
    <Main />
  </DataLayer>,
  document.getElementById("root")
);
