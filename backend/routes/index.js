express = require("express")
router = express.Router()
const User = require("../models/user")
const Study = require("../models/Study")
mongoose = require("mongoose")
const multer = require("multer")
var mime = require('mime')
const fs = require("fs")

//파일 업로드
//cb is callback
var storage = multer.diskStorage({
  // 2
  destination(req, file, cb) {
    cb(null, "images/")
  },
  //하단 주석처리시 images/폴더안에 난수로 파일 저장->난수는 DB에 저장
  //filename(req, file, cb) {
  //  cb(null, file.originalname)
  //},
})

var uploadWithOriginalFilename = multer({ storage: storage }) // 3-2

const { PythonShell } = require("python-shell")
const { db } = require("../models/readout")
let options = {
  scriptPath: "",
  args: [""],
}

//검사결과 업로드?
router.post(
  "/input",
  uploadWithOriginalFilename.single("test"),
  function (req, res) {
    // 4
    //res.render('confirmation', { file:req.file, files:null });
    res.json(req.file)
    console.log(req.file)
    console.log(req.file.filename)
    options.args = [req.file.filename]
    PythonShell.run("Dicom_analyze.py", options, function (err, data) {
      if (err) throw err

      //dicom db에 넣는 코드 python코드가 끝나고 실행되어야함으로 pythonshell안에 넣음
      let json_path =
        "./" + req.file.filename + "/" + req.file.filename + ".json"
      console.log(json_path)
      //const fs = require('fs');
      var dicomdata = fs.readFileSync(json_path) //json연결
      let a = JSON.parse(dicomdata) //객체로 파싱
      var study = new Study() //모델 인스턴스 생성
      Object.assign(study, a) //모델 인스턴스에 파싱된Json 할당

      study.save(function (err) {
        //DB에 저장
        if (err) console.log(err)
      })
      console.log(study.RequestDate)
    })
  }
)