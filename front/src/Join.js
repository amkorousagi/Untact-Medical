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

import { loginState, isDoctorState } from "./state"

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
  border-radius: 3px;
`

// 너비, 그림자 설정
const ShadowedBox = styled.div`
  width: 500px;
  border-radius: 3px;
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

const DoctorInput = () => {
  return (
    <div>
      <div style={divStyle}>
        <Input style={{ margin: "5px" }} placeholder='이메일' />
        <Input small style={{ margin: "5px" }} placeholder='이름' />
      </div>
      <div style={divStyle}>
        <Input style={{ margin: "5px" }} placeholder='비밀번호' />
        <Input style={{ margin: "5px" }} placeholder='소속 병원' />
      </div>

      <div style={divStyle}>
        <Input style={{ margin: "5px" }} placeholder='비밀번호 번호 확인' />
        <Input style={{ margin: "5px" }} placeholder='전공' />
      </div>
    </div>
  )
}

const PlzInput = () => {
  return (
    <div>
      <div style={divStyle}>
        <Input style={{ margin: "5px" }} placeholder='이메일' />
        <Input small style={{ margin: "5px" }} placeholder='이름' />
      </div>
      <div style={divStyle}>
        <Input style={{ margin: "5px" }} placeholder='비밀번호' />
        <Input style={{ margin: "5px" }} placeholder='전화번호' />
      </div>

      <div style={divStyle}>
        <Input style={{ margin: "5px" }} placeholder='비밀번호 번호 확인' />
        <Input style={{ margin: "5px" }} placeholder='계좌번호' />
      </div>
    </div>
  )
}

function Join(props) {
  const [isDoctor, setIsDoctor] = useRecoilState(isDoctorState)
  let history = useHistory()
  const routeChange = (e) => {
    alert("회원가입 됨")
    history.push("/login")
  }
  return (
    <div>
      <h1>Untact Medical!</h1>
      <Positioner style={{ borderRadius: "5px" }}>
        <ShadowedBox>
          <Contents>
            {isDoctor ? <DoctorInput /> : <PlzInput />}
            <button
              style={{
                backgroundColor: "white",
                borderColor: "palevioletred",
                color: "palevioletred",
                margin: "5px",
                borderRadius: "3px",
              }}
              onClick={(e) => {
                setIsDoctor(!isDoctor)
              }}>
              {isDoctor ? "의뢰자용 계정" : "의사용 계정"}
            </button>
            <button
              style={{
                backgroundColor: "white",
                borderColor: "palevioletred",
                color: "palevioletred",
                margin: "5px",
                borderRadius: "3px",
              }}
              onClick={routeChange}>
              회원가입
            </button>
          </Contents>
        </ShadowedBox>
      </Positioner>
    </div>
  )
}
export default Join
