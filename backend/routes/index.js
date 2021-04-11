express = require("express")
router = express.Router()
const { User } = require("../models/user")
const { Dicom } = require("../models/Dicom")
mongoose = require("mongoose")
const multer = require("multer")
ejs = require("ejs")
var mime = require('mime')
const fs = require("fs")

const showList=require('../showList')

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
router.get("/download_page", (req, res) => res.render("download_page", {page: "download_page"}));

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
  //하단 주석처리시 images/폴더안에 난수로 파일 저장
  filename(req, file, cb) {
    cb(null, file.originalname)
  },
})

var uploadWithOriginalFilename = multer({ storage: storage }) // 3-2

const { PythonShell } = require("python-shell")
const { db } = require("../models/readinginfo")
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
      var dicom = new Dicom() //모델 인스턴스 생성
      Object.assign(dicom, a) //모델 인스턴스에 파싱된Json 할당

      dicom.save(function (err) {
        //DB에 저장
        if (err) console.log(err)
      })
      console.log(dicom.RequestDate)
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
        res.write('<br><a href="/getdata"> Get data </a>')
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

router.get("/getdata", (req, res) => {
  database
    .collection("dicoms")
    .find({})
    .toArray(function (err, docs) {
      if (err) throw err
      //res.send(docs);
      res.writeHead(200, { "Content-Type": "text/html;characterset=utf8" })
      res.write("<h1>Dicom index</h1>")
      for (let i = 0; i < docs.length; i++) {
        res.write(
          docs[i]._id +
            "// " +
            docs[i].PatientID +
            "  :   " +
            docs[i].PatientName +
            "  :   " +
            docs[i].PatientAge +
            "  :   " +
            docs[i].PatientBirthDate +
            "<br/>"
        )
        //res.write('<br><a href="/dicom_index"> Dicom index </a>');
      }
      res.end()
    })
})


router.get('/download', (req, res)=>{///:fileid
	const fileId = req.query.fileid 
	var fname, fpath, fileSize
	//const tuser='hgl',tnum='1',tkind='remark',folder='156871'//예시 t 대신 req.query. 으로 대입하면 됨

	const testFname = req.query.num+'_'+req.query.kind
	const testFpath = './DATA/'+ req.query.user + '_work/'+req.query.folder+'/_'+req.query.kind
	var ext
	if(req.query.kind=='origin' || req.query.kind == 'worked'  ){//tkind=='origin' || tkind == 'worked'
		ext = '.png'
	}
	else{
		ext = '.txt'
	}
	fname=testFname+ext
	fpath=testFpath
	//fname = tnum+'_'+tkind+ext
	//fpath = './DATA/'+ req.query.user + '_work/'+folder+'/_'+tkind
	fileSize = '160931'

	
	const file = fpath + '/' + fname 
	

	mimetype = mime.lookup( fname ) 
    
    res.setHeader('Content-disposition', 'attachment; filename=' + fname ) 
    res.setHeader('Content-type', mimetype)

    const filestream = fs.createReadStream(file)
    filestream.pipe(res)
})

router.get('/list', function(req,res){
	user = 'hgl'//req.query.user
	res.send(showList.get(user))
	
})

module.exports = router
