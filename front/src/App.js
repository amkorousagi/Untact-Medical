import logo from "./cloud.png"
import "./App.css"

import React, { useState, useEffect } from "react"
import {
  Route,
  Link,
  BrowserRouter,
  Switch,
  useHistory,
} from "react-router-dom"

import Join from "./Join"
import Login from "./Login"
import Home from "./Home"
import Dash from "./Dash"

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil"

import { loginState, isDoctorState, isDashState } from "./state"
let history
const Content = (props) => {
  return (
    <div>
      <Route path='/' exact component={Home}></Route>
      <Route path='/join' component={Join}></Route>
      <Route path='/login' component={Login}></Route>
      <Route path='/dash' exact component={Dash}></Route>
    </div>
  )
}
const Header = (props) => {
  history = useHistory()
  const [isDoctor, setIsDoctor] = useRecoilState(isDoctorState)
  const [isDash, setIsDash] = useRecoilState(isDashState)
  const handleDoctor = (e) => {
    e.preventDefault()
    console.log("hi doctor")
    setIsDoctor(true)
    setIsDash(true)
    history.push("/dash")
  }
  const handleNonDoctor = (e) => {
    e.preventDefault()
    setIsDoctor(false)
    setIsDash(true)
    history.push("/dash")
  }
  if (isDash == true) {
    return <></>
  }

  if (props.isLogin === true) {
    return (
      <div>
        <p>
          <a href='/'>Home</a>
        </p>
        <p>
          의뢰를 맡기고 싶은가요?
          <a href='/dash' onClick={handleNonDoctor}>
            의뢰자용 대시보드
          </a>
        </p>
        <p>
          판독을 하고 싶은가요?
          <a href='/dash' onClick={handleDoctor}>
            판독자용 대시보드
          </a>
        </p>
      </div>
    )
  } else if (props.isLogin === false) {
    return (
      <div>
        <p>
          <Link to='/'>Home</Link>
        </p>
        <p>
          아직 회원이 아니신가요?
          <Link to='/join'>회원가입</Link>
        </p>
        <p>
          이미 회원이신가요?
          <Link to='/login'>로그인</Link>
        </p>
      </div>
    )
  } else {
    return <p>이상하다</p>
  }
}

function App() {
  const [isLogin, setIsLogin] = useRecoilState(loginState)

  return (
    <div className='App'>
      <header className='App-header'>
        <BrowserRouter>
          <Switch>
            <Content />
          </Switch>
          <Header isLogin={isLogin} />
        </BrowserRouter>
      </header>
    </div>
  )
}

export default App

/*
<Content
          where={where}
          handle_where={handle_where}
          handle_isLogin={handle_isLogin}
        />
        <Header isLogin={isLogin} handle_where={handle_where} />
*/
