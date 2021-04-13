express = require("express")
router = express.Router()
const { User } = require("../models/user")
const { Study } = require("../models/Study")
mongoose = require("mongoose")
const multer = require("multer")
ejs = require("ejs")
var mime = require('mime')
const fs = require("fs")

router.get("/", (req, res) => {
  console.log("start")
  res.render("start")
})
router.get("/login", (req, res) => res.render("login", { page: "login" }))
router.get("/signup", (req, res) => res.render("signup", { page: "signup" }))
router.get("/login_success", (req, res) =>
  res.render("login_success", { page: "login_success" })
)
router.get("/dicom_index", (req, res) =>
  res.render("dicom_index", { page: "dicom_index" })
)

//mongoose.connect("mongodb+srv://junhopark-admin:admin@cluster0.glonm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
function connectDB() {
  var databaseURL =
    "mongodb+srv://junhopark-admin:admin@cluster0.glonm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  mongoose.connect(databaseURL, function (err, db) {
    if (err) {
      console.log("db connect error")
      return
    }
    console.log("db was connected : " + databaseURL)
    database = db
  })
}
connectDB()

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

var authUser = function (db, Email, Passwd, callback) {
  console.log("input id :" + Email.toString() + "  :  pw : " + Passwd)
  //cmd 에서 db.users  로 썻던 부분이 있는데 이때 이 컬럼(테이블)에 접근은 다음처럼 한다
  var users = database.collection("users")

  var result = users.find({ Email: Email, Password: Passwd })

  result.toArray(function (err, docs) {
    if (err) {
      callback(err, null)
      return
    }

    if (docs.length > 0) {
      console.log("find user [ " + docs + " ]")
      callback(null, docs)
    } else {
      console.log("can not find user [ " + docs + " ]")
      callback(null, null)
    }
  })
}
router.post("/login", (req, res, next) => {
  console.log(req.body)

  //var users=database.collection("users");
  //var result=users.find({"Email":req.body.Email,"Passwd":req.body.Password});
  authUser(database, req.body.Email, req.body.Password, function (err, docs) {
    if (database) {
      if (err) {
        console.log("Error!", err)
        return
      }
      if (docs) {
        console.dir(docs)
        res.writeHead(200, { "Content-Type": "text/html;characterset=utf8" })
        res.write("<h1>Login Success</h1>")
        res.write(
          docs[0].Email +
            "  :   " +
            docs[0].DoctorName +
            "  :   " +
            docs[0].Role +
            "  :   " +
            docs[0].AffiliatedHospital
        )
        res.write('<br><a href="/getStudies"> Get data </a>')
        res.end()
      } else {
        console.log("empty error")
        res.writeHead(200, { "Content-Type": "text/html;characterset=utf8" })
        res.write("<h1>Login Fail</h1>")
        res.write('<br><a href="/login"> re login </a>')
        res.end()
      }
    } else {
      console.log("DB 연결 x")
    }
  })
})

router.post("/signup", async (req, res, next) => {
  console.log("body", req.body)
  //console.log("req", req);
  //connectDB();

  //check required
  //check 중복
  if (
    req.body.Email == "" ||
    req.body.Email == undefined ||
    req.body.Password == "" ||
    req.body.Password == undefined ||
    req.body.DoctorName == "" ||
    req.body.DoctorName == undefined ||
    req.body.Role == "" ||
    req.body.Role == undefined ||
    req.body.AffiliatedHospital == "" ||
    req.body.AffiliatedHospital == undefined
  ) {
    return res.status(400).json({ success: false, err: "required is empty" })
  }
  const result = await User.find({ Email: req.body.Email })
  if (result != []) {
    return res.status(400).json({ success: false, err: "duplicated email" })
  }

  const user = new User(req.body)
  try {
    await user.save()
    return res.status(200).json({ success: true })
  } catch (err) {
    console.log(err)
    return res.json({ success: false, err })
  }
})

router.get("/getStudies", (req, res) => {
  database
    .collection("studies")
    .find({})
    .toArray(function (err, docs) {
      if (err) throw err
     
      res.render('getStudies',{study_info:docs});
    })
})


var getDataFromStudyID = function (db, StudyID, callback) {
  //console.log("StudyID :" +StudyID.toString())
  var studyid = database.collection("studies")
  
  //console.log('stu : ',StudyID)
  var result = studyid.find({ StudyID: StudyID })
  
  result.toArray(function (err, docs) {
    if (err) {
      callback(err, null)
      return
    }
    console.log('docs',docs)
    if (docs.length > 0) {
      console.log("find StudyID [ " + docs + " ]")
      callback(null, docs[0].URL)
      callback(null, docs[0].NumberOfImg)
      console.log("complete")
    } else {
      console.log("can not find StudyID [ " + docs + " ]")
      callback(null, null)
    }
  })
}

//StudyID입력 시 해당 폴더 URL과 이미지 수 전송

router.get("/getURLFromStudyID", (req, res, next) => {
  
  temp="4f25ee888361f0fd66064442c76dd7d3"
  //getIMGfromStudyID(database, req.query.StudyID, function (err, docs) {
  getDataFromStudyID(database, temp, function (err, docs) {
    if (database) {
      if (err) {
        console.log("Error!", err)
        return
      }
      if (docs) {
        console.log("docs",docs)
      } else {
        console.log("empty error")
      }
    } else {
      console.log("DB 연결 x")
    }
  })
})

//URL 입력시 사진 출력
router.get('/showIMG', (req, res)=>{

	var fpath, fileSize

	
	//fpath=req.query.path
  fpath="E:\\Desktop\\Project2\\backend//4f25ee888361f0fd66064442c76dd7d3/137.png"
	fileSize = '160931'

	
	const file = fpath
	

	//mimetype = mime.lookup( ) 
    
    //res.setHeader('Content-disposition', 'attachment; filename=' + fname ) 
    //res.setHeader('Content-type', mimetype)

  const filestream = fs.createReadStream(file)
  filestream.pipe(res)
})

//URL 입력시 사진 출력
router.get('/uploadReadout', (req, res)=>{
  const ReadOut = require("../models/readout");
   
  var readout = new ReadOut()
  readout.ReadId = readout._id
  // readout.ReadText =req.query.ReadText
  // readout.StudyId = req.query.StudyId
  // readout.ReadResult = req.query.ReadResult
  
  readout.ReadText ="정말 위험합니다."
  readout.StudyId = "4f25ee888361f0fd66064442c76dd7d3"
  readout.ReadResult = "비정상"
  readout.URL="E:\\Desktop\\Project2\\backend//"+readout.ReadId
  console.log(readout)
  
  readout.save(function (err) {
    //DB에 저장
    if (err) console.log(err)
  })
 })
 
 
module.exports = router