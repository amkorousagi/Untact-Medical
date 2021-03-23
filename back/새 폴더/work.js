HEL = require('./HEL')
fs = require('fs')
ab = 11

function continueWork(){
    return 0;
}

function showWorkList(user){
    dic = HEL.getListFromDB(user)
    return dic
}
    //[작업이름][작업 진행율%]
    
function aaaa(){
    return 33
}

function readMeta(meta){
    HEL.fileRead(meta)
}

function readRemark(fname){
    HEL.fileRead(fname)
}
    

function editRmark(fname,str){
    HEL.writeFile(fname,str)
}

// console.log('show : ',showWorkList('user'))
// editRmark('test.txt','fu**ing dangerous!')
// readRemark('test.txt')
// readMeta('0009.DCM.txt')



