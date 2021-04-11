fs = require('fs')

exports.get = function(user){
    dirName = './DATA/'+user+"_work"
    dic = fs.readdirSync(dirName)
    return dic
}