import React from "react"
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

const Result = () => {
  const [value, setValue] = React.useState("normal")
  const [images, setImages] = React.useState([lung, kakao])
  const [index, setIndex] = React.useState(0)
  let saveableCanvas
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  const handleNext = () => {
    if (index + 1 < images.length) setIndex(index + 1)
  }
  const handlePrior = () => {
    if (index - 1 >= 0) setIndex(index - 1)
  }
  return (
    <Container>
      <Row>
        <Col>이미지 : {index + 1}/2</Col>
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
        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
          <img src={images[index]} width='100%' />
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
                value='normal'
                control={<Radio />}
                label='정상'
              />
              <FormControlLabel
                disabled
                value='abnormal'
                control={<Radio />}
                label='이상'
              />
            </RadioGroup>
          </FormControl>
        </Col>
        <Col>
          <TextField disabled placeholder='긴 소견' variant='outlined' multiline />
        </Col>
      </Row>
      <Row>
        <Col>
          <TextField disabled placeholder='짧은 소견' required />
        </Col>
        <Col>
          <Typography>판독일자 : 2020-3-5</Typography>
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
      <Row>
        <Col>
          <FormLabel component='legend'>판독 의사 정보</FormLabel>
        </Col>
      </Row>
      <Row>
        <Col>
          <Typography paragraph>이름 : 김제빵</Typography>
        </Col>
        <Col>
          <Typography paragraph>소속병원명 : 파티마</Typography>
        </Col>
        <Col>
          <Typography paragraph>전공 : 소아과</Typography>
        </Col>
      </Row>
    </Container>
  )
}

export default Result
