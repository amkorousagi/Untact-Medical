import React, {useState} from "react"
import styled from "styled-components"
import { useHistory } from "react-router-dom"

import { useRecoilState } from "recoil"

import { loginState, isDoctorState } from "./state/state"
import { Input } from "@material-ui/core"
import axios from "axios"
const config = require("../config")

const LoginInput = ({setEmail,setPassword}) => {
  return (
    <div>
      <Input style={{ margin: "5px" }} placeholder='이메일' onChange={(e)=>setEmail(e.target.value)}/>
      <Input style={{ margin: "5px" }} placeholder='비밀번호'onChange={(e)=>setPassword(e.target.value)} />
    </div>
  )
}

function Login(props) {
  let history = useHistory()
  const [isLogin, setIsLogin] = useRecoilState(loginState)
  const [isDoctor, setIsDoctor] = useRecoilState(isDoctorState)
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const routeChange = async (e) => {
    try {
      const result = await axios.post(
        config.backURL + "/login",
        {
          Email: email,
          Password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      console.log(result)
      if (result.data.success) {
        window.localStorage.setItem("token",result.data.token)
        setIsLogin(true)
        alert("로그인 됨")
        if (isDoctor) history.push("/reader")
        else history.push("/requester")
      } else {
        alert("실패 :" + result.data.err)
      }
    } catch (error) {
      console.log(error)
      alert("실패 :" + error)
      return
    }
  }
  return (
    <div>
      <h1>Untact Medical!</h1>
      <LoginInput setEmail={setEmail} setPassword={setPassword}/>
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
