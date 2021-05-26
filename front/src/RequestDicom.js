import React, { useState } from "react"
import {
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Button,
} from "@material-ui/core"
import { Container, Row, Col } from "react-bootstrap"
import axios from "axios"
const config = require("../config")

const Request = () => {
  const [dicom, setDicom] = useState([])
  const onChange = (e) => {
    setDicom(e.target.files)
  }
  const onSubmit = async (e) => {
    //backend api
    e.preventDefault();
    const formData = new FormData();
    formData.append("dicom",dicom[0],"test.dicom")
    
    const token = window.localStorage.getItem("token")
    const result = await axios.post(config.backURL + "/study/dicom",formData, {
      headers: { Authorization: "bearer " + token },
    })
    if(result.status == 200){
      alert("의뢰 생성 성공!")
    }else{
      alert("실패 ",result)
    }
    console.log(result)
  }

  return (
    <>
      <Row>
        <Col>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>검사 결과 (판독 의뢰)</FormLabel>
          </FormControl>
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col>
          <input type='file' multiple onChange={onChange} />

          <Button
            variant='outlined'
            onClick={onSubmit}>
            <strong>검사 제출</strong>
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default Request
