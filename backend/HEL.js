fs = require('fs')

    
exports.getList = function (user){
    dirName = './DATA/'+user+"_work"
    return fs.readdirSync(dirName)
}

exports.fileRead=function(fname){
    data = fs.readFileSync(fname, 'utf8');
    return data
}

exports.writeFile = function(fname,str){
    ext =fs.exists(fname, function (exists) { 
        console.log(exists ? true : false) 
    })
    if (ext){
        fs.unlink(fname, function (err) { 
            if (err) throw err; 
        })
    }

    fs.writeFile(fname,str,function(err){ 
        if (err === null) { 
            console.log('success'); 
        } 
        else { console.log('fail'); } })
}

exports.fileDown = function(req, res){///:fileid
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
	
	const file = fpath + '/' + fname 
	

	mimetype = mime.lookup( fname ) 
    
    res.setHeader('Content-disposition', 'attachment; filename=' + fname ) 
    res.setHeader('Content-type', mimetype)

    const filestream = fs.createReadStream(file)
    filestream.pipe(res)
}

exports.uploadDicom = function (){
    return 1
}


exports.uploadDicom = function (){
    return 1
}

exports.uploa
