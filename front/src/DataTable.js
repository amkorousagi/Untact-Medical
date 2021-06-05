import React, { useEffect, useState } from "react"
import { DataGrid } from "@material-ui/data-grid"
import axios from "axios"
import { currentIdState } from "./state/state"
import { useRecoilState } from "recoil"
import {
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core"
import { useHistory } from "react-router-dom"
const config = require("./config")
const Readout = ({ StudyId }) => {
  return (
    <Button
      strong='true'
      color='blue '
      style={{ margin: 16, backgroundColor: "red" }}
      onClick={(e) => {
        const win = window.open("/reader/readout?id=" + StudyId, "_blank")
        window.focus()
      }}>
      판독
    </Button>
  )
}
//필터기능
//난중에 반응형으로 디바이스 width 얻어와서 생략된 환자 정보 보여줄지 결정
const Result = ({ ReadId }) => {
  return (
    <Button
      strong='true'
      color='blue '
      style={{ margin: 16, backgroundColor: "red" }}
      onClick={(e) => {
        const win = window.open("/requester/result?id=" + ReadId, "_blank")
        window.focus()
      }}>
      결과
    </Button>
  )
}
const Request = ({ user, history }) => {
  if (user == "reader") {
    return <div></div>
  } else {
    return (
      <>
        <Button
          onClick={() => {
            history.push("/requester/request")
          }}>
          의뢰하기
        </Button>
        <Button
          onClick={() => {
            history.push("/requester/request_dicom")
          }}>
          의뢰하기(dicom)
        </Button>
      </>
    )
  }
}

export default function DataTable({ user }) {
  const exampleRows = [
    {
      id: 1,
      state: "이전",
      patientID: "a",
      patientName: "박세찬",
      patientSex: "남",
      patientAge: "23",
      modality: "CT",
      countImage: 5,
      doctorName: "김제빵",
      result: "정상",
      studyDate: "2020/12/18",
      requestDate: "2020/12/18",
      readoutDate: "2020/12/20",
      requestComent: "요로시쿠",
    },
    {
      id: 2,
      state: "완료",
      patientID: "b",
      patientName: "박세찬",
      patientSex: "남",
      patientAge: "23",
      modality: "CT",
      countImage: 5,
      doctorName: "김제빵",
      result: "이상소견",
      studyDate: "2020/12/18",
      requestDate: "2020/12/18",
      readoutDate: "2020/12/20",
      requestComent: "요로시쿠",
    },
    {
      id: 3,
      state: "진행중",
      patientID: "c",
      patientName: "박세찬",
      patientSex: "남",
      patientAge: "23",
      modality: "CT",
      countImage: 5,
      doctorName: "김제빵",
      result: "이상소견",
      studyDate: "2020/12/18",
      requestDate: "2020/12/18",
      readoutDate: "2020/12/20",
      requestComent: "요로시쿠",
    },
  ]
  const [origin,setOrigin] = useState([])
  const [currentRows, setCurrentRows] = useState([])
  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (user == "reader") {
      axios.get(config.backURL + `/study`,{headers:{"Authorization":"bearer "+token}}).then((res) => {
        console.log(res.data)
        if (res.status == 200) {
          setOrigin(
            res.data.map((d) => {
              return {
                id: d.StudyID ? d.StudyID : "myid",
                state: d.ReadStatus,
                patientID: d.PatientID,
                patientName: d.PatientName,
                patientSex: d.PatientSex,
                patientAge: d.PatientAge,
                modality: d.Modality,
                countImage: d.NumberOfImg,
                doctorName: d.ReferringPhysicianName,
                studyDate: d.StudyDate,
                requestDate: d.StudyDate,
                readoutDate: d.ReadDate,
                requestComent: d.StudyDescription,
              }
            })
          )
          setCurrentRows(
            res.data.map((d) => {
              return {
                id: d.StudyID ? d.StudyID : "myid",
                state: d.ReadStatus,
                patientID: d.PatientID,
                patientName: d.PatientName,
                patientSex: d.PatientSex,
                patientAge: d.PatientAge,
                modality: d.Modality,
                countImage: d.NumberOfImg,
                doctorName: d.ReferringPhysicianName,
                studyDate: d.StudyDate,
                requestDate: d.StudyDate,
                readoutDate: d.ReadDate,
                requestComent: d.StudyDescription,
              }
            })
          )
        }
      })
    } else {
      axios.get(config.backURL + `/study`,{headers:{"Authorization":"bearer "+token}}).then((res) => {
        console.log(res)
        if (res.status == 200) {
          setOrigin(
            res.data.map((d) => {
              return {
                id: d.StudyID ? d.StudyID : "myid",
                state: d.ReadStatus,
                patientID: d.PatientID,
                patientName: d.PatientName,
                patientSex: d.PatientSex,
                patientAge: d.PatientAge,
                modality: d.Modality,
                countImage: d.NumberOfImg,
                doctorName: d.ReferringPhysicianName,
                studyDate: d.StudyDate,
                requestDate: d.StudyDate,
                readoutDate: d.ReadDate,
                requestComent: d.StudyDescription,
                readId: d.ReadId,
              }
            })
          )
          setCurrentRows(
            res.data.map((d) => {
              return {
                id: d.StudyID ? d.StudyID : "myid",
                state: d.ReadStatus,
                patientID: d.PatientID,
                patientName: d.PatientName,
                patientSex: d.PatientSex,
                patientAge: d.PatientAge,
                modality: d.Modality,
                countImage: d.NumberOfImg,
                doctorName: d.ReferringPhysicianName,
                studyDate: d.StudyDate,
                requestDate: d.StudyDate,
                readoutDate: d.ReadDate,
                requestComent: d.StudyDescription,
                readId: d.ReadId,
              }
            })
          )
        }
      })
    }
  }, [])
  //useeffect로 row만 backend에서 받아오며됨. -> 그냥 그전에 받아오면됨
  let columns = [
    {
      field: "id",
      headerName: "No",
      type: "number",
      width: 80,
    },
    { field: "state", headerName: "판독 상태", width: 120 },
    { field: "patientID", headerName: "환자ID" },
    { field: "patientName", headerName: "환자명" },
    { field: "patientSex", headerName: "성별" },
    { field: "patientAge", headerName: "나이", type: "number" },
    { field: "modality", headerName: "검사장비", width: 120 },
    {
      field: "countImage",
      headerName: "이미지 수",
      type: "number",
      width: 120,
    },
    { field: "doctorName", headerName: "판독의사명", width: 120 },
    { field: "studyDate", headerName: "검사일자", width: 120 },
    { field: "requestDate", headerName: "요청일자", width: 120 },
    { field: "readoutDate", headerName: "판독일자", width: 120 },
    { field: "requestComent", headerName: "요청사항", width: 120 },
    {
      field: "readout",
      headerName: user === "reader" ? "판독" : "결과",
      sortable: false, //id={params.getValue("patientID")}
      renderCell: (params) => {
        return user === "reader" ? (
          <Readout StudyId={params.getValue("id")} />
        ) : (
          <Result ReadId={params.getValue("readId")} />
        )
      },
    },
  ]

  const [abnormal, setAbnormal] = useState(false)
  const [before, setBefore] = useState(false)
  const [proceeding, setProceeding] = useState(false)
  const [completed, setCompleted] = useState(false)
  const history = useHistory()
  const interestedRows = ({ abnormal, before, completed }) => {
    let temp = origin
    if (abnormal) temp = temp.filter((r) => r.state === "이상")
    if (before | proceeding | completed)
      temp = temp.filter(
        (r) =>
          ((r.state === "미판독") & before) |
          ((r.state === "정상") & completed)
      )
    return temp
  }
  const handlerAbnormal = (e) => {
    setAbnormal(!abnormal)
    if (!abnormal == true) {
      setCurrentRows(
        interestedRows({
          abnormal: !abnormal,
          before: before,
          completed: completed,
        })
      )
    } else {
      setCurrentRows(
        interestedRows({
          abnormal: !abnormal,
          before: before,
          completed: completed,
        })
      )
    }
  }
  const handlerBefore = (e) => {
    setBefore(!before)
    if (!before == true) {
      setCurrentRows(
        interestedRows({
          abnormal: abnormal,
          before: !before,
          completed: completed,
        })
      )
    } else {
      setCurrentRows(
        interestedRows({
          abnormal: abnormal,
          before: !before,
          completed: completed,
        })
      )
    }
  }
  const handlerCompleted = (e) => {
    setCompleted(!completed)
    if (!completed == true) {
      setCurrentRows(
        interestedRows({
          abnormal: abnormal,
          before: before,
          proceeding: proceeding,
          completed: !completed,
        })
      )
    } else {
      setCurrentRows(
        interestedRows({
          abnormal: abnormal,
          before: before,
          proceeding: proceeding,
          completed: !completed,
        })
      )
    }
  }
  return (
    <>
      <FormGroup row><FormControlLabel
          control={<Checkbox checked={before} onChange={handlerBefore} />}
          label='filter 판독상태이전'
        />
        <FormControlLabel
          control={<Checkbox checked={abnormal} onChange={handlerAbnormal} />}
          label='filter 판독결과이상'
        />
        
        <FormControlLabel
          control={<Checkbox checked={completed} onChange={handlerCompleted} />}
          label='filter 판독결과정상'
        />
        <Request user={user} history={history} />
      </FormGroup>

      <div
        style={{ height: 500, width: "100%", backgroundColor:"white" }}>
        <DataGrid rows={currentRows} columns={columns} pageSize={7} />
      </div>
      <div style={{textAlign:"right"}}>
      <Button style={{margin:50, backgroundColor:"red"}} onClick={()=>{
        history.push(user=="reader"?"/requester":"/reader")
      }}>{user=="reader"?"의뢰자 페이지로":"판독자 페이지로"}</Button></div>
    </>
  )
}
