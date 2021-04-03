import React from "react"
import ReactDOM from "react-dom"
import "./style/index.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import Router from "./router/Router"
import { BrowserRouter, Switch } from "react-router-dom"
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil"

ReactDOM.render(
  <RecoilRoot>
    <BrowserRouter>
      <Switch>
        <Router />
      </Switch>
    </BrowserRouter>
  </RecoilRoot>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
