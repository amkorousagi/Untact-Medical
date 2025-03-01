import React, { useState, useEffect } from "react"
import CanvasDraw from "react-canvas-draw"
import {
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Button,
  Typography,
} from "@material-ui/core"
import { Container, Row, Col } from "react-bootstrap"
import queryString from "query-string"
import axios from "axios"

const config = require("./config")
const CD = ({ imgSrc, savedCanvas, index }) => {
  return (
    <CanvasDraw
      id='mycanvas'
      key={imgSrc}
      ref={(canvasDraw) => {
        if (canvasDraw != null && savedCanvas[index])
          canvasDraw.loadSaveData(savedCanvas[index])
      }}
      brushRadius={1}
      brushColor='red'
      canvasWidth='100%'
      canvasHeight='100%'
      lazyRadius={0}
      imgSrc={imgSrc}
      disabled
    />
  )
}

const Result = ({ location }) => {
  const [value, setValue] = useState("normal")
  const [images, setImages] = useState([])
  const [index, setIndex] = useState(0)
  const [readText, setReadText] = useState("")
  const [patientID, setpatientID] = useState("")
  const [patientName, setpatientName] = useState("")
  const [patientAge, setpatientAge] = useState("")
  const [patientBirthDate, setpatientBirthDate] = useState("")
  const [patientSex, setpatientSex] = useState("")
  const [studyDate, setstudyDate] = useState("")
  const [modality, setmodality] = useState("")
  const [studyDescription, setstudyDescription] = useState("")
  const [readDate,setReadDate] = useState("")
  const [savedCanvas, setSavedCanvas] = useState({})
  const [doctorName, setDoctorName] = useState("")
  const [hospital, setHospital] = useState("")
  const [major, setMajor] = useState("")

  const id = queryString.parse(location.search).id
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  const handleNext = () => {
    if (index + 1 < images.length) setIndex(index + 1)
  }
  const handlePrior = () => {
    if (index - 1 >= 0) setIndex(index - 1)
  }
  useEffect(() => {
    const help = async () => {
      const token = window.localStorage.getItem("token")
      const result = await axios.get(config.backURL+"/readout/" + id, {
        headers: { Authorization: "bearer " + token },
      })
      setReadText(result.data.ReadText)
      setValue(result.data.ReadResult)
      setSavedCanvas(result.data.Canvases)

      console.log(result.data)

      const result2 = await axios.get(
        config.backURL+"/study/" + result.data.StudyId,
        {
          headers: { Authorization: "bearer " + token },
        }
      )
      setpatientID(result2.data.PatientID)
      setpatientName(result2.data.PatientName)
      setpatientAge(result2.data.PatientAge)
      setpatientBirthDate(result2.data.PatientBirthDate)
      setpatientSex(result2.data.PatientSex)
      setstudyDate(result2.data.StudyDate)
      setmodality(result2.data.Modality)
      setstudyDescription(result2.data.StudyDescription)
      setReadDate(result2.data.ReadDate)

      let res = []
      for (let i = 1; i <= result2.data.NumberOfImg; i++) {
        res.push(
          config.backURL + "/show?dirName=" +
            result2.data.StudyID +
            "&num=" +
            i
        )
      }
      setImages(res)

      console.log(result2.data)

      const result3 = await axios.get(config.backURL+"/doctor/"+result.data.UserId, {
        headers: { Authorization: "bearer " + token },
      })
      console.log(result3.data)
      setDoctorName(result3.data.DoctorName)
      setHospital(result3.data.AffiliatedHospital)
      setMajor(result3.data.Role)
    }
    help()
  }, [])
  return (
    <Container>
      <Row>
        <Col>
          이미지 : {index + 1}/{images.length}
        </Col>
        <Col>
          <Button variant='outlined' onClick={handlePrior}>
            <strong>이전</strong>
          </Button>
        </Col>
        <Col>
          <Button variant='outlined' onClick={handleNext}>
            <strong>다음</strong>
          </Button>
        </Col>
      </Row>
      <hr></hr>
      <Row xl={12} lg={12} md={12} sm={12} xs={12}>
        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
          <img src={images[index]} width='100%' />
        </Col>
        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
          <CD savedCanvas={savedCanvas} imgSrc={images[index]} index={index} />
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>판독 결과</FormLabel>
            <RadioGroup
              aria-label='gender'
              name='result'
              value={value}
              onChange={handleChange}>
              <FormControlLabel
                disabled
                value='정상'
                control={<Radio />}
                label='정상'
              />
              <FormControlLabel
                disabled
                value='이상'
                control={<Radio />}
                label='이상'
              />
            </RadioGroup>
          </FormControl>
        </Col>
        <Col>
          <TextField
            disabled
            placeholder={readText}
            variant='outlined'
            multiline
          />
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <Typography>판독일자 : {readDate}</Typography>
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col>
          <FormLabel component='legend'>환자 정보</FormLabel>
        </Col>
      </Row>
      <Row>
        <Col>
          <Typography paragraph>이름 : {patientName}</Typography>
        </Col>
        <Col>
          <Typography paragraph>성별 : {patientSex}</Typography>
        </Col>
        <Col>
          <Typography paragraph>나이 : {patientAge}</Typography>
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <Typography paragraph>촬영일자 : {studyDate}</Typography>
        </Col>
        <Col>
          <Typography paragraph>검사장비 : {modality}</Typography>
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col>
          <FormLabel component='legend'>촬영 상세</FormLabel>
          <Typography paragraph>{studyDescription}</Typography>
        </Col>
        <Col>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormLabel component='legend'>판독 의사 정보</FormLabel>
        </Col>
      </Row>
      <Row>
        <Col>
          <Typography paragraph>이름 : {doctorName}</Typography>
        </Col>
        <Col>
          <Typography paragraph>소속병원명 : {hospital}</Typography>
        </Col>
        <Col>
          <Typography paragraph>전공 : {major}</Typography>
        </Col>
      </Row>
    </Container>
  )
}

export default Result
