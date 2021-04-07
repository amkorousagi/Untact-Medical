fs = require('fs')

    
exports.getListFromDB = function (user){
    dirName = user+"_work"
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

exports.fileDown = function(req, res){
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
}

exports.uploadDicom = function (){
    return 1
}


exports.uploadDicom = function (){
    return 1
}

exports.uploa
