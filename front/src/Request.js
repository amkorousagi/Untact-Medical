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

const Request = () => {
  const [images, setImages] = useState([])
  const [patientID,setpatientID] = useState("")
  const [patientName,setpatientName] = useState("")
  const [patientAge,setpatientAge] = useState("")
  const [patientBirthDate,setpatientBirthDate] = useState("")
  const [patientSex,setpatientSex] = useState("")
  const [studyDate,setstudyDate] = useState("")
  const [modality,setmodality] = useState("")
  const [studyDescription,setstudyDescription] = useState("")


  const onChange = (e) => {
    setImages(e.target.files)
  }
  const onSubmit = async (e) => {
    //backend api
    e.preventDefault();
    const formData = new FormData();
    formData.append("patientID",patientID)
    formData.append("patientName",patientName)
    formData.append("patientAge",patientAge)
    formData.append("patientBirthDate",patientBirthDate)
    formData.append("patientSex",patientSex)
    formData.append("studyDate",studyDate)
    formData.append("modality",modality)
    formData.append("studyDescription",studyDescription)
    for(let i=0; i<images.length;i++){
      formData.append("image",images[i],i)
    }
    
    const result = await axios.post("http://localhost:3001/study",formData)
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
          <TextField  placeholder='환자ID' required onChange={(e)=>{setpatientID(e.target.value)}}/>
        </Col>
        <Col>
          <TextField  placeholder='환자이름' required onChange={(e)=>{setpatientName(e.target.value)}}/>
        </Col>
        <Col>
          <TextField  placeholder='환자나이' required onChange={(e)=>{setpatientAge(e.target.value)}}/>
        </Col>
        <Col>
          <TextField placeholder='환자 생년월일(991228)' required onChange={(e)=>{setpatientBirthDate(e.target.value)}}/>
        </Col>
        <Col>
          <TextField placeholder='환자성별' required onChange={(e)=>{setpatientSex(e.target.value)}}/>
        </Col>
        </Row>
        <Row>
        <Col>
          <TextField placeholder='검사일자' required onChange={(e)=>{setstudyDate(e.target.value)}}/>
        </Col>
        <Col>
          <TextField placeholder='검사장비' required onChange={(e)=>{setmodality(e.target.value)}}/>
        </Col>
      </Row>
      <hr/>
      <Row>
        <Col>
          <TextField placeholder='요청사항' variant='outlined' multiline onChange={(e)=>{setstudyDescription(e.target.value)}}/>
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
