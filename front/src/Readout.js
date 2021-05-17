import React, { useEffect, useState } from "react"
import CanvasDraw from "react-canvas-draw"
import lung from "./resource/lung.jpg"
import kakao from "./resource/kakaotalk.png"
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
import qs from "query-string"
import axios from "axios"

const Img = ({src})=>{
  console.log(src)
  return <img src={src} width={"100%"}/>
}

const CD = ({setSaveableCanvas,imgSrc})=>{
  return <CanvasDraw
  key={imgSrc}
  ref={(canvasDraw) => (setSaveableCanvas(canvasDraw))}
  brushRadius={1}
  brushColor='red'
  canvasWidth='100%'
  canvasHeight='100%'
  lazyRadius={0}
  imgSrc={imgSrc}
/>
}

const Readout = ({ match, location }) => {
  const [value, setValue] = useState("normal")
  const [images, setImages] = useState([])
  const [index, setIndex] = useState(0)
  const [patientName, setPatientName] = useState("")
  const [patientSex, setPatientSex] = useState("")
  const [patientAge, setPatientAge] = useState("")
  const [studyDate, setStudyDate] = useState("")
  const [modality, setModality] = useState("")
  const [studyDescription, setstudyDescription] = useState("")
  const [dirName, setDirname] = useState("")
  const [maxImages, setMaxImages] = useState(0)
  const id = qs.parse(location.search).id
  const [saveableCanvas, setSaveableCanvas] = useState({})
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  const handleNext = () => {
    if (index + 1 < images.length) setIndex(index + 1)
    saveableCanvas.clear()
  }
  const handlePrior = () => {
    if (index - 1 >= 0) setIndex(index - 1)
    saveableCanvas.clear()
  }
  useEffect(() => {
    const help = async () => {
      console.log(id)
      const result = await axios.get("http://localhost:3001/study/" + id)
      console.log(result.data)
      const data = result.data
      setPatientName(data.PatientName)
      setPatientSex(data.PatientSex)
      setPatientAge(data.PatientAge)
      setStudyDate(data.StudyDate)
      setModality(data.Modality)
      setstudyDescription(data.StudyDescription)
      setDirname(data.StudyID)
      setMaxImages(data.NumberOfImg)
      let res = []
      for (let i = 1; i <= data.NumberOfImg; i++) {
        res.push(
          "http://localhost:3001/show?dirName=" + data.StudyID + "&num=" + i
        )
      }
      setImages(res)
    }
    help()
  }, [])
  return (
    <Container>
      <Row>
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
        <Col>
          <Button
            variant='outlined'
            onClick={() => {
              localStorage.setItem("savedDrawing", saveableCanvas.getSaveData())
            }}>
            <strong>(현재장)저장</strong>
          </Button>
        </Col>
        <Col>
          <Button
            variant='outlined'
            onClick={() => {
              saveableCanvas.clear()
            }}>
            <strong>초기화</strong>
          </Button>
        </Col>
        <Col>
          <Button
            variant='outlined'
            onClick={() => {
              saveableCanvas.undo()
            }}>
            <strong>되돌리기</strong>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          이미지 : {index + 1}/{images.length}
        </Col>
      </Row>
      <hr></hr>
      <Row xl={12} lg={12} md={12} sm={12} xs={12}>
        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
          <Img src={images[index]} />
        </Col>
        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
        <CD setSaveableCanvas={setSaveableCanvas} imgSrc={images[index]}/>
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
                value='normal'
                control={<Radio />}
                label='정상'
              />
              <FormControlLabel
                value='abnormal'
                control={<Radio />}
                label='이상'
              />
            </RadioGroup>
          </FormControl>
        </Col>
        <Col>
          <TextField placeholder='긴 소견' variant='outlined' multiline />
        </Col>
      </Row>
      <Row>
        <Col>
          <TextField placeholder='짧은 소견' required />
        </Col>
        <Col>
          <Button
            variant='outlined'
            onClick={() => {
              alert("제출합니다")
            }}>
            <strong>판독 제출(완료)</strong>
          </Button>
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
        <Col>
          <Typography paragraph>촬영일자 : {studyDate}</Typography>
        </Col>
        <Col>
          <Typography paragraph>검사장비 : {modality}</Typography>
        </Col>
        <Col>
          <Typography paragraph></Typography>
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col>
          <FormLabel component='legend'>촬영 상세</FormLabel>
          <Typography paragraph>{studyDescription}</Typography>
        </Col>
        <Col>
          <FormLabel component='legend'></FormLabel>
          <Typography paragraph></Typography>
        </Col>
      </Row>
    </Container>
  )
}

export default Readout
