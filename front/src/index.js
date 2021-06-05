import React from "react"
import ReactDOM from "react-dom"
import "./style/index.css"
import "bootstrap/dist/css/bootstrap.min.css"

import Router from "./router/Router"
import { BrowserRouter, Switch } from "react-router-dom"
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil"
import logo from "./resource/logo.png"

const Header = () => {
  return (
    <div style={{textAlign:"center"}}>
        <img src={logo}/>
    </div>
  )
}

const Footer = () => {  
  return (
    <div style={{margin:0, bottom:0,width:"100%",height:50, backgroundColor:"black",  position: "absolute"}}>
      <p style={{width:"100%", color: "gray", textAlign:"center"}}>Copyright <span dangerouslySetInnerHTML={{ "__html": "&copy;" }} /> Untact Medical</p>
    </div>
  )
}

ReactDOM.render(
  <RecoilRoot>
    <BrowserRouter>
      <Header />
      <Switch>
        <Router />
      </Switch>
      <Footer />
    </BrowserRouter>
  </RecoilRoot>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
