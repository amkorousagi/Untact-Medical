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
    cb(null, "images/" + req.study_id)
  },
  //하단 주석처리시 images/폴더안에 난수로 파일 저장->난수는 DB에 저장
  filename: (req, file, cb) => {
    console.log("file")
    req.cnt++
    console.log("cnt", req.cnt)
    cb(null, "" + req.cnt + path.extname(file.originalname))
  },
})
const upload = multer({ storage: storage })

// 이미지 총 개수와 상위 디렉토리이름 = 스터디 id

let options = {
  scriptPath: "",
  args: [""],
}
studyRouter.post(
  "/",
  async (req, res, next) => {
    //await Study.deleteMany({})
    console.log("start")
    const study = await Study.create({})
    console.log("study", study)
    req.study_id = study._id
    req.cnt = 0
    !fs.existsSync("images/" + study._id) && fs.mkdirSync("images/" + study._id)
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
      NumberOfImg: "" + req.cnt,
      ReadStatus: "미판독", //판독상태
    }
    console.log(new_study)
    //callback을 쓰자
    const updated_study = await Study.findByIdAndUpdate(
      req.study_id,
      new_study,
      (err, res) => {
        if (err) {
          console.log("err", err)
        }
        console.log("res", res)
        return res
      }
    )
    res.json(updated_study)
  }
)

let storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads")
  },
  filename: function (req, file, cb) {
    cb(null, getFile(file))
  },
})

function getFile(file) {
  let oriFile = file.originalname
  let ext = path.extname(oriFile)
  let name = path.basename(oriFile, ext)
  let rnd = Math.floor(Math.random() * 90) + 10 // 10 ~ 99
  return Date.now() + "-" + rnd + "-" + name + ext
}
let upload2 = multer({
  storage: storage2,
})
studyRouter.post(
  "/dicom",
  upload2.any(),
  async (req, res, next) => {
    await Study.deleteMany({})
    console.log("start")
    const study = await Study.create({StudyID: "ini"})
    console.log("study", study)
    req.study_id = study._id
    req.cnt = 0
    !fs.existsSync("images/" + study._id) && fs.mkdirSync("images/" + study._id)
    next()
  },
  function (req, res) {
    //console.log(req.body)
    console.log("ds ", req.files)
    // 4
    //res.render('confirmation', { file:req.file, files:null });

    console.log(req.files[0].path, "images/" + req.study_id)
    options.args = [req.files[0].path, "images/" + req.study_id]
    PythonShell.run("Dicom_analyze.py", options, function (err, data) {
      if (err) throw err
      
      console.log("result, ",data);
      
      //dicom db에 넣는 코드 python코드가 끝나고 실행되어야함으로 pythonshell안에 넣음
      let json_path =
      "images/" + req.study_id + "/data.json"
      console.log(json_path)
      //const fs = require('fs');
      var dicomdata = fs.readFileSync(json_path) //json연결
      let a = JSON.parse(dicomdata) //객체로 파싱
      a = {...a, StudyID:req.study_id};
      var study = new Study() //모델 인스턴스 생성
      Object.assign(study, a) //모델 인스턴스에 파싱된Json 할당

      study.save(function (err) {
        //DB에 저장
        if (err) console.log(err)
      })
      console.log(study.RequestDate)
      res.json(study)
    })
  }
)
module.exports = studyRouter
