var express = require("express")
var fs = require('fs')
var mime = require('mime')
var router   = express.Router()
var app = express()
const cors = require("cors");
const workers=require('./workersMode')
app.use(cors())


app.get('/', function(req, res){
	fs.readFile('./test.html', function(error, data){ 
		res.writeHead(200, {'Content-Type':'text/html'})
		res.end(data)
	})
})

// user(판독하는 사람)가 판독해야하는 작업 list
// psc:작업 사진을 주는 것이 아니라, 모든 검사 list 를 DB에서 받아와야한다.
// psc:애초에 orign이랑 remark만 있으면 되지 왜 worked가 있는 건지 난 잘 모르겠다 worked 같은건 DB 쪽에서 봐야하지 않나
app.get('/list', function(req,res){
	user = 'hgl'//req.params.user
	res.send(workers.showWorkList(user))
	
})

// kind는 머지? 애초에 왜 worked 아래에 remarked 있다느 식으로 적어놓은 거지?, 실제로는 유저? 디렉토리 및에origran remark worked 같은 디렉토리 상에 있는데
// folder는 머 study 번호 인건가 사진 번호인건가? 무슨의미인지 올바른 변수이름이었으면 좋겠다
app.get('/download', function(req, res){///:fileid
	const fileId = req.params.fileid 
	var fname, fpath, fileSize
	const tuser='hgl',tnum='1',tkind='remark',folder='156871'//예시 t 대신 req.params. 으로 대입하면 됨

	const testFname = req.params.num+'_'+req.params.kind
	const testFpath = './DATA/'+ req.params.user + '_work/'+req.params.folder+'/_'+req.params.kind
	var ext
	if(req.params.kind=='origin' || req.params.kind == 'worked'){//tkind=='origin' || tkind == 'worked' 
		ext = '.png'
	}
	else{
		ext = '.txt'
	}
	fname=testFname
	fpath=testFpath+ext
	//fname = tnum+'_'+tkind+ext
	//fpath = './DATA/'+ tuser + '_work/'+folder+'/_'+tkind
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
	
	
	const file = fpath + '/' + fname 
	

	mimetype = mime.lookup( fname ) 
    
    res.setHeader('Content-disposition', 'attachment; filename=' + fname ) 
    res.setHeader('Content-type', mimetype)

    const filestream = fs.createReadStream(file)
    filestream.pipe(res)
})

app.listen(8000,function(){
     console.log("Working on port 8000")
})

exports = router