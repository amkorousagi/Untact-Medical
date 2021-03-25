
express = require("express");
router = express.Router();
const {User} = require("../models/user");
const {Dicom} = require("../models/Dicom");
mongoose=require("mongoose");
const multer = require('multer')
ejs=require('ejs');
const fs = require('fs');

router.get('/', (req,res) => res.render('start'));
router.get("/login", (req, res) => res.render("login", {page: "login"}));
router.get("/signup", (req, res) => res.render("signup", {page: "signup"}));
router.get("/login_success", (req, res) => res.render("login_success", {page: "login_success"}));
router.get("/dicom_index", (req, res) => res.render("dicom_index", {page: "dicom_index"}));


//mongoose.connect("mongodb+srv://junhopark-admin:admin@cluster0.glonm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
function connectDB(){
  var databaseURL = "mongodb+srv://junhopark-admin:admin@cluster0.glonm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  mongoose.connect(databaseURL,
    function(err,db){
      if(err){
        console.log('db connect error');
        return;
      }
      console.log('db was connected : '+ databaseURL);
      database=db;
    }
  );
}
connectDB();

var storage  = multer.diskStorage({ // 2
    destination(req, file, cb) {
      cb(null, 'images/');
    },
    //하단 주석처리시 images/폴더안에 난수로 파일 저장
    filename(req, file, cb) {
      cb(null, file.originalname)
    },
});

var uploadWithOriginalFilename = multer({ storage: storage }); // 3-2

const { PythonShell } = require("python-shell");
const { db } = require("../models/readinginfo");
let options = {
  scriptPath: "",
  args: [""]
};

router.post('/input', uploadWithOriginalFilename.single('test'), function(req,res){ // 4 
  //res.render('confirmation', { file:req.file, files:null });
  res.json(req.file)
  console.log(req.file)
  console.log(req.file.filename)
  options.args=[req.file.filename]
  PythonShell.run("Dicom_analyze.py", options, function(err, data) {
    if (err) throw err;
    
    //dicom db에 넣는 코드 python코드가 끝나고 실행되어야함으로 pythonshell안에 넣음
    let json_path='./'+req.file.filename+'/'+req.file.filename+'.json';
    console.log(json_path);
    //const fs = require('fs');
    var dicomdata = fs.readFileSync(json_path);	//json연결
    let a = JSON.parse(dicomdata);	//객체로 파싱
    var dicom = new Dicom();		//모델 인스턴스 생성
    Object.assign(dicom,a);		//모델 인스턴스에 파싱된Json 할당

    dicom.save(function (err){	//DB에 저장
	  if (err) console.log(err);
    });
    console.log(dicom.RequestDate);
  
  });
  
});


var authUser=function(db,Email,Passwd,callback){
  console.log('input id :' + Email.toString() + '  :  pw : ' + Passwd);
  //cmd 에서 db.users  로 썻던 부분이 있는데 이때 이 컬럼(테이블)에 접근은 다음처럼 한다
  var users = database.collection("users");

  var result = users.find({ "Email": Email ,"Password": Passwd });

  result.toArray(
      function (err, docs) {
          if (err) {
              callback(err, null);
              return;
          }

          if (docs.length > 0) {
              console.log('find user [ ' + docs + ' ]');
              callback(null, docs);
          }
          else {
              console.log('can not find user [ ' + docs + ' ]');
              callback(null, null);
          }
      }

  );

};
router.post("/login",(req,res,next)=>{
    console.log(req.body);
    
    //var users=database.collection("users");
    //var result=users.find({"Email":req.body.Email,"Passwd":req.body.Password});
    authUser(database,req.body.Email,req.body.Password,function(err,docs){
      if(database){
        if (err){
          console.log('Error!',err);
          return;
        }
        if(docs){
          console.dir(docs);
          res.writeHead(200, { "Content-Type": "text/html;characterset=utf8" });
          res.write('<h1>Login Success</h1>');
          res.write(docs[0].Email + '  :   ' + docs[0].DoctorName+ '  :   ' + docs[0].Role  + '  :   ' + docs[0].AffiliatedHospital );
          res.write('<br><a href="/getdata"> Get data </a>');
          res.end();
        }
        else{
          console.log('empty error');
          res.writeHead(200, { "Content-Type": "text/html;characterset=utf8" });
          res.write('<h1>Login Fail</h1>');
          res.write('<br><a href="/login"> re login </a>');
          res.end();
        }
      }
      else{
        console.log('DB 연결 x');
      }
    });  
});


router.post("/signup",(req,res,next)=>{
    console.log(req.body);
    //connectDB();

    const user = new User(req.body);
    user.save((err,userInfo)=>{
      if(err) {console.log(err); return res.json({success:false,err});}
      else{
        res.writeHead(200, { "Content-Type": "text/html;characterset=utf8" });
        res.write('<h1>Complete signup</h1>');
        res.write('<br><a href="/login"> re login </a>');
        res.end();
        //return res.status(200).json({success:true});
      }
    });
});


router.get("/getdata",(req,res)=>{
  
  database.collection('dicoms').find({}).toArray(function(err,docs) {

    if (err) throw err;
    //res.send(docs);
    res.writeHead(200, { "Content-Type": "text/html;characterset=utf8" });
    res.write('<h1>Dicom index</h1>');
    for(let i=0;i<docs.length;i++){
          res.write(docs[i]._id+'// '+docs[i].PatientID + '  :   ' + docs[i].PatientName+ '  :   ' + docs[i].PatientAge  + '  :   ' + docs[i].PatientBirthDate +'<br/>');
          //res.write('<br><a href="/dicom_index"> Dicom index </a>'); 
    }
    res.end();
  });
});

module.exports = router;