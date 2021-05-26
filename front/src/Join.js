import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useRecoilState } from "recoil"

import { isDoctorState } from "./state/state"
import { Input } from "@material-ui/core"
const axios = require("axios")
const config = require("../config")
/*
const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.small ? 5 : undefined,
}))

`
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
*/
const DoctorInput = ({ onChange }) => {
  return (
    <>
      <div>
        <Input placeholder='이메일' onChange={(e) => onChange(e, "이메일")} />
        <Input placeholder='이름' onChange={(e) => onChange(e, "이름")} />
      </div>
      <div>
        <Input
          placeholder='비밀번호'
          onChange={(e) => onChange(e, "비밀번호")}
        />
        <Input
          placeholder='소속 병원'
          onChange={(e) => onChange(e, "소속 병원")}
        />
      </div>

      <div>
        <Input
          placeholder='비밀번호 확인'
          onChange={(e) => onChange(e, "비밀번호 확인")}
        />
        <Input placeholder='전공' onChange={(e) => onChange(e, "전공")} />
      </div>
    </>
  )
}

const RequesterInput = ({ onChange }) => {
  return (
    <>
      <div>
        <Input placeholder='이메일' onChange={(e) => onChange(e, "이메일")} />
        <Input placeholder='이름' onChange={(e) => onChange(e, "이름")} />
      </div>
      <div>
        <Input
          placeholder='비밀번호'
          onChange={(e) => onChange(e, "비밀번호")}
        />
        <Input
          placeholder='소속 병원'
          onChange={(e) => onChange(e, "소속 병원")}
        />
      </div>

      <div>
        <Input
          placeholder='비밀번호 확인'
          onChange={(e) => onChange(e, "비밀번호 확인")}
        />
        <Input placeholder='전공' onChange={(e) => onChange(e, "전공")} />
      </div>
    </>
  )
}

function Join(props) {
  const [isDoctor, setIsDoctor] = useRecoilState(isDoctorState)
  let history = useHistory()
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [hospital, setHospital] = useState("")

  //const backJoin

  const routeChange = async (e) => {
    if(password != rePassword){
      alert("비밀 번호가 일치하지 않습니다")
      return
    }

    let result = "";
    try {
      result = await axios.post(
        config.backURL + "/join",
        {
          Email: email,
          Password: password,
          DoctorName: name,
          Role: role,
          AffiliatedHospital: hospital,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      console.log(result)
      if (result.data.success) {
        alert("회원가입 됨")
        history.push("/login")
      } else {
        alert("실패 :" + result.data.err)
      }
    } catch (error) {
      console.log(error);
      alert("실패 :" + error.response.data.err)
      return
    }
  }
  const onChange = (e, label) => {
    if (label == "이름") {
      console.log(e.target.value)
      setName(e.target.value)
    } else if (label == "이메일") {
      console.log(e.target.value)
      setEmail(e.target.value)
    } else if (label == "비밀번호") {
      console.log(e.target.value)
      setPassword(e.target.value)
    } else if (label == "비밀번호 확인") {
      console.log(e.target.value)
      setRePassword(e.target.value)
    } else if (label == "전공") {
      console.log(e.target.value)
      setRole(e.target.value)
    } else if (label == "소속 병원") {
      console.log(e.target.value)
      setHospital(e.target.value)
    } else {
      console.log(e.target.value)
      console.log("wrong label")
    }
  }
  return (
    <div>
      <h1>Untact Medical!</h1>
      {isDoctor ? (
        <DoctorInput onChange={onChange} />
      ) : (
        <RequesterInput onChange={onChange} />
      )}
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
    </div>
  )
}
export default Join
