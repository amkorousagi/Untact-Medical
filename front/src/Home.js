import logo from "./resource/cloud.png"
import "./style/Home.css"
import React, { useState } from "react"
import styled from "styled-components"
import oc from "open-color"
//import { shadow } from "./lib/sytleUtils"
import { Link, useHistory } from "react-router-dom"
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil"

import { loginState } from "./state/state"



function Home() {
  const his = useHistory()
  return (
    <div>
      <h1>Untact Medical!</h1>
      <img src={logo} className='App-logo' alt='logo' />
      <a href={"/login"}>login </a>
      <a href={"/join"}>join</a>
    </div>
  )
}
export default Home
