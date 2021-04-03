import React from "react"
import styled from "styled-components"
import { useHistory } from "react-router-dom"

import { useRecoilState } from "recoil"

import { loginState, isDoctorState } from "./state/state"
import { Input } from "@material-ui/core"

const LoginInput = () => {
  return (
    <div>
      <Input style={{ margin: "5px" }} placeholder='이메일' />
      <Input style={{ margin: "5px" }} placeholder='비밀번호' />
    </div>
  )
}

function Login(props) {
  let history = useHistory()
  const [isLogin, setIsLogin] = useRecoilState(loginState)
  const [isDoctor, setIsDoctor] = useRecoilState(isDoctorState)
  const routeChange = (e) => {
    setIsLogin(true)
    alert("로그인 됨")
    if (isDoctor) history.push("/reader")
    else history.push("/requester")
  }
  return (
    <div>
      <h1>Untact Medical!</h1>
      <LoginInput />
      <button
        style={{
          backgroundColor: "white",
          borderColor: "palevioletred",
          color: "palevioletred",
          borderRadius: "3px",
        }}
        onClick={routeChange}>
        로그인
      </button>
    </div>
  )
}
export default Login
