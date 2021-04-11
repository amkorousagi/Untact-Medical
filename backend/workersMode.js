HEL = require('./HEL')
fs = require('fs')

exports.getProccess = function(user,works){
    dirName = user+"_work/" + works+'/'
    n = fs.readdirSync(dirName+'_remark').length/(fs.readdirSync(dirName+'_origin').length-1)
    return n*100 +'%'
}

exports.showWorkList = function(user){
    dic = HEL.getList(user)
    return dic
}

exports.readMeta= function(user,works){
    fname = user+'_work/' + works + '/_meta.txt'
    return HEL.fileRead(fname)
}

exports.readRemark= function(user,works,num){
    fname = user+'_work/' + works +'/_remark/'+num+'_remark.txt'
    return HEL.fileRead(fname)
}
    

exports.editRmark= function(user,works,str,num){
    fname = './DATA'+user+'_work/' + works +'/_remark/'+num+'_remark.txt'
    HEL.writeFile(fname,str)
}


