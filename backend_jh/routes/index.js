
express = require("express");
router = express.Router();
User = require("../models/user");
//mongoose=require("mongoose");
const multer = require('multer')

var storage  = multer.diskStorage({ // 2
    destination(req, file, cb) {
      cb(null, 'images/');
    },
    filename(req, file, cb) {
      cb(null, file.originalname)
    },
});

var uploadWithOriginalFilename = multer({ storage: storage }); // 3-2

const { PythonShell } = require("python-shell");
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
    console.log(data);
  });
});

router.get('/', (req,res) => res.render('start'));
router.get("/login", (req, res) => res.render("login", {page: "login"}));
router.get("/signup", (req, res) => res.render("signup", {page: "signup"}));
router.get("/login_success", (req, res) => res.render("login_success", {page: "login_success"}));

router.post("/login",(req,res,next)=>{
    console.log(req.body);
});

router.post("/signup",(req,res,next)=>{
    console.log(req.body);

});
module.exports = router;