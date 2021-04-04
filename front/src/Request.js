import React, { useState } from "react"
import {
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Button,
} from "@material-ui/core"
import { Container, Row, Col } from "react-bootstrap"

const Request = () => {
  const [images, setImages] = useState([])

  const onChange = (e) => {
    setImages(e.target.files)
  }
  const onClick = () => {
    //backend api
  }

  return (
    <>
      <Row>
        <Col>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>검사 결과</FormLabel>
          </FormControl>
        </Col>
      </Row>
      <Row>
        <Col>
          <TextField  placeholder='환자이름' required />
        </Col>
        <Col>
          <TextField type="number" placeholder='환자나이' required />
        </Col>
        <Col>
          <TextField type="date" placeholder='검사일자' required />
        </Col>
        <Col>
          <TextField placeholder='검사장비' required />
        </Col>
      </Row>
      <Row>
        <Col>
          <TextField placeholder='요청사항' variant='outlined' multiline />
        </Col>
      </Row>
      <Row>
        <Col>
          <input type='file' multiple onChange={onChange} />

          <Button
            variant='outlined'
            onClick={() => {
              alert("제출합니다")
            }}>
            <strong>검사 제출</strong>
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default Request
