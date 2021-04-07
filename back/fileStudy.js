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

app.get('/download', function(req, res){///:fileid
	const fileId = req.params.fileid 
	var fname, fpath, fileSize
	const tuser='hgl',tnum='1',tkind='remark',folder='156871'//예시 t 대신 req.params. 으로 대입하면 됨

	const testFname = req.params.num+'_'+req.params.kind
	const testFpath = './DATA/'+ req.params.user + '_work/'+req.params.folder+'/_'+req.params.kind
	var ext
	if(tkind=='origin' || tkind == 'worked' ){//req.params.kind=='origin' || req.params.kind == 'worked' 
		ext = '.png'
	}
	else{
		ext = '.txt'
	}
	//fname=testFname
	//fpath=testFpath+ext
	fname = tnum+'_'+tkind+ext
	fpath = './DATA/'+ tuser + '_work/'+folder+'/_'+tkind
	fileSize = '160931'


	// if( fileId == '1'  ){
	// 	fname = '1_origin.png'
	// 	fpath = './DATA/hgl_work/156871/_origin'
	// 	fileSize = '61684'
	// }else if( fileId == '2'  ){
	// 	fname = '1_worked.png'
	// 	fpath = './DATA/hgl_work/156871/_worked'
	// 	fileSize = '160931'
	// }else if( fileId == '3'  ){
	// 	fname = '1_remark.txt'
	// 	fpath = './DATA/hgl_work/156871/_remark'
	// 	fileSize = '160931'
	// }
	// else if( fileId == '4'  ){
	// 	var ext
	// 	if(tkind=='origin' || tkind == 'worked' ){//req.params.kind=='origin' || req.params.kind == 'worked' 
	// 		ext = '.png'
	// 	}
	// 	else{
	// 		ext = '.txt'
	// 	}
	// 	//fname=testFname
	// 	//fpath=testFpath+ext
	// 	fname = tnum+'_'+tkind+ext
	// 	fpath = './DATA/'+ tuser + '_work/'+folder+'/_'+tkind
	// 	fileSize = '160931'
	// }
	
	
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