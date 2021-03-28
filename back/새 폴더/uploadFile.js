
express = require("express");
router = express.Router();


const multer = require('multer')

var storage  = multer.diskStorage({ // 2
    destination(req, file, cb) {
      cb(null, 'images/');
    },
    //하단 주석처리시 images/폴더안에 난수로 파일 저장
    filename(req, file, cb) {
      cb(null, file.originalname)
    },
});

var uploadWithOriginalFilename = multer({ storage: storage })

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