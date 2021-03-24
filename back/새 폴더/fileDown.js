var express = require("express")
var util = require('util')
var fs = require('fs')
var path = require('path')
var mime = require('mime')
var router   = express.Router()
var multer   = require('multer')
var app = express()

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
	},
	filename: function (req, file, cb) {
	  cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
	}
})

var upload = multer({ storage: storage })


app.get('/upload', function(req, res){
	res.render('upload');
});
app.post('/upload', upload.single('userfile'), function(req, res){
	res.send('Uploaded! : '+req.file); // object를 리턴함
	console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
});


app.get('/', function(req, res){
	fs.readFile('./fileList.html', function(error, data){ 
		res.writeHead(200, {'Content-Type':'text/html'})
		res.end(data)
	})
})

app.get('/download/:fileid', function(req, res){
	var fileId = req.params.fileid 
	var fname, fpath, fileSize 
	
	
	if( fileId == '1'  ){
		fname = 'aaa.txt'
		fpath = 'E:/Desktop/Project2/back/aaa'
		fileSize = '61684'
	}else if( fileId == '2'  ){
		fname = 'UI.png'
		fpath = 'E:/Desktop/Project2/back/aaa'
		fileSize = '160931'
	}
	
	
	var file = fpath + '/' + fname 
	

	mimetype = mime.lookup( fname ) 
    
    res.setHeader('Content-disposition', 'attachment; filename=' + fname ) 
    res.setHeader('Content-type', mimetype)

    var filestream = fs.createReadStream(file)
    filestream.pipe(res)
})

app.listen(8000,function(){
     console.log("Working on port 8000")
})

exports = router