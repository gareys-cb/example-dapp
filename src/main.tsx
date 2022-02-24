import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import util from "util";
// @ts-expect-error
window.util = util;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
