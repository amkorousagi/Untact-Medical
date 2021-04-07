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
const axios = require("axios")

const Readout = () => {
  const [value, setValue] = useState("normal")
  const [images, setImages] = useState([lung, kakao])
  const [index, setIndex] = useState(0)
  let saveableCanvas
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  const handleNext = () => {
    console.log(images);
    if (index + 1 < images.length) setIndex(index + 1)
    saveableCanvas.clear()
  }
  const handlePrior = () => {
    if (index - 1 >= 0) setIndex(index - 1)
    saveableCanvas.clear()
  }
  useEffect(()=>{
    //모든 이미지 url을 불러오는 fetch
    setImages(images.concat("http://localhost:8000/download/2"))
  },[])
  
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
        <Col>이미지 : {index + 1}/{images.length}</Col>
      </Row>
      <hr></hr>
      <Row xl={12} lg={12} md={12} sm={12} xs={12}>
        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
          <img src={images[index]} width='100%' />
        </Col>
        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
          <CanvasDraw
            ref={(canvasDraw) => (saveableCanvas = canvasDraw)}
            brushRadius={1}
            brushColor='red'
            canvasWidth='100%'
            canvasHeight='100%'
            lazyRadius={0}
            imgSrc={images[index]}
          />
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
          <Typography paragraph>이름 : 홍길동</Typography>
        </Col>
        <Col>
          <Typography paragraph>성별 : 남자</Typography>
        </Col>
        <Col>
          <Typography paragraph>나이 : (만)23세</Typography>
        </Col>
      </Row>
      <Row>
        <Col>
          <Typography paragraph>촬영병원명 : 파티마</Typography>
        </Col>
        <Col>
          <Typography paragraph>촬영일자 : 2020-3-4</Typography>
        </Col>
        <Col>
          <Typography paragraph>검사장비 : CT</Typography>
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col>
          <FormLabel component='legend'>촬영 상세</FormLabel>
          <Typography paragraph>하위</Typography>
        </Col>
        <Col>
          <FormLabel component='legend'>요청 사항</FormLabel>
          <Typography paragraph>없음</Typography>
        </Col>
      </Row>
    </Container>
  )
}

export default Readout
