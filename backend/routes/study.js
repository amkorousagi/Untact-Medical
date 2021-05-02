const studyRouter = require("express").Router()
const Study = require("../models/Study")
const multer = require("multer")
const { PythonShell } = require("python-shell")
const path = require("path")
const fs = require("fs")

studyRouter.get("/:id", async (req, res, next) => {
  if (!req.params.id) {
    //all study show
    const studys = await Study.find({})
    res.json(studys)
  }

  const study = await Study.findById(req.params.id)
  res.json(study)
})

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    console.log("dest")
    cb(null,"images/" + req.study_id)
  },
  //하단 주석처리시 images/폴더안에 난수로 파일 저장->난수는 DB에 저장
  filename: (req, file, cb)=> {
    console.log("file")
    req.cnt++
    console.log("cnt",req.cnt)
    cb(null, "" + req.cnt + path.extname(file.originalname))
  },
})
const upload = multer({ storage: storage })
let options = {
  scriptPath: "",
  args: [""],
}
// 이미지 총 개수와 상위 디렉토리이름 = 스터디 id
studyRouter.post(
  "/",
  async (req, res, next) => {
    await Study.deleteMany({})
    console.log("start")
    const study = await Study.create({})
    console.log("study",study)
    req.study_id = study._id
    req.cnt = 0
    !fs.existsSync("images/"+study._id) && fs.mkdirSync("images/"+study._id)
    next()
  },
  upload.array("image"),
  async (req, res, next) => {
    const new_study = {
      StudyID: req.study_id,
      PatientID: req.patientID,
      PatientName: req.patientName,
      PatientAge: req.patientAge,
      PatientBirthDate: req.patientBirthDate,
      PatientSex: req.patientSex,
      StudyDate: req.studyDate,
      Modality: req.modality,
      StudyDescription: req.studyDescription,
      ReferringPhysicianName: req.referringPhysicianName,
      NumberOfImg: ""+req.cnt,
      ReadStatus: "미판독", //판독상태
    }
    console.log(new_study)
    //callback을 쓰자
    const updated_study = await Study.findByIdAndUpdate(
      req.study_id,
      new_study,
      (err,res)=>{
          if(err){
              console.log("err",err)
          }
          console.log("res",res)
          return res
      }
    )
    res.json(updated_study)
  }
)

module.exports = studyRouter
