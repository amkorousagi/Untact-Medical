var express = require("express")
var fs = require('fs')
var mime = require('mime')
var router   = express.Router()
var app = express()
const cors = require("cors");
app.use(cors())


app.get('/', function(req, res){
	fs.readFile('./fileList.html', function(error, data){ 
		res.writeHead(200, {'Content-Type':'text/html'})
		res.end(data)
	})
})

app.get('/aaaa',function(req,res){
	console.log('333')
	return 33
})

app.get('/download/:fileid', function(req, res){
	var fileId = req.params.fileid 
	var fname, fpath, fileSize 
	
	
	if( fileId == '1'  ){
		fname = 'aaa.txt'
		fpath = './aaa'
		fileSize = '61684'
	}else if( fileId == '2'  ){
		fname = 'UI.png'
		fpath = './aaa'
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