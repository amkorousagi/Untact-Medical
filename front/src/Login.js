import React, { useState } from "react"
import styled from "styled-components"
import oc from "open-color"
import { shadow } from "./lib/sytleUtils"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil"

import { loginState } from "./state"

const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.small ? 5 : undefined,
}))`
  border-radius: 3px;
  border: 1px solid palevioletred;
  display: block;
  margin: 0 0 1em;
  padding: ${(props) => props.padding};

  ::placeholder {
    color: palevioletred;
  }
`

const Positioner = styled.div`
  position: relative;
`

// 너비, 그림자 설정
const ShadowedBox = styled.div`
  width: 500px;
  ${shadow(2)}
`
// children 이 들어가는 곳
const Contents = styled.div`
  background: white;
  padding: 2rem;
  height: auto;
`

const divStyle = {
  display: "flex",
  alignItems: "center",
}

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
  const routeChange = (e) => {
    setIsLogin(true)
    alert("로그인 됨")
    history.push("/")
  }
  return (
    <div>
      <h1>Untact Medical!</h1>
      <Positioner>
        <ShadowedBox>
          <Contents>
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
          </Contents>
        </ShadowedBox>
      </Positioner>
    </div>
  )
}
export default Login
