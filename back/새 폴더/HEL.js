fs = require('fs')

function getEmail(id){
    return id;
}
    
function getPassword(pw){
    return pw;
}
    
function getImg(img){
    //get image from DB
    return img
}
    
function getTxt(txt){
// get txt from DB
    return txt
}
    
function getRemark(name){
//name에 해당하는 소견서 저장 위치 반환
    return name+".txt"
}
    
function uploadRemark(){
    return 1
}
    
function uploadTxt(){
    return 1
}
    
function uploadImg(){
    return 1
}
    
exports.getListFromDB = function (user){
    dic = {'환자A CT영상' : '73%','환자B X-ray영상' : '13%','환자C CT영상' : '100%'}
    return dic
}

exports.fileRead=function(fname){
    fs.readFile(fname, 'utf8', function(err, data) { console.log(data); });
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

//logic
exports.uploadDicom = function (){
    return 1
}

