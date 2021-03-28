HEL = require('./HEL')
fs = require('fs')



exports.showWorkList = function(user){
    dic = HEL.getListFromDB(user)
    return dic
}

exports.readMeta= function(user,works,num){
    fname = user+'_work/' + works + '/'+num+'_meta.txt'
    return HEL.fileRead(fname)
}

exports.readRemark= function(user,works,num){
    fname = user+'_work/' + works +'/'+num+'_remark.txt'
    return HEL.fileRead(fname)
}
    

exports.editRmark= function(user,str,num){
    fname = user+'_work/' + works +'/'+num+'_remark.txt'
    HEL.writeFile(fname,str)
}


