import logo from "./cloud.png"
import "./Home.css"
import React, { useState } from "react"
import styled from "styled-components"
import oc from "open-color"
import { shadow } from "./lib/sytleUtils"
import { Link, useHistory } from "react-router-dom"
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil"

import { loginState } from "./state"



function Home() {
  return (
    <div>
      <h1>Untact Medical!</h1>
      <img src={logo} className='App-logo' alt='logo' />
      
    </div>
  )
}
export default Home
