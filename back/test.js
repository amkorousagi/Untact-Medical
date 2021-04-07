workersMode = require('./workersMode')

user = 'hgl'
works = 'work1'
num = 1

str = "아주 위헙합니다 \n 정말 위험합니다."

console.log('show : ',workersMode.showWorkList(user))
console.log('remark:\n',workersMode.readRemark(user,works,num))
workersMode.editRmark(user,str,num)
console.log('meta:\n',workersMode.readMeta(user,works))
console.log('progress : ',workersMode.getProccess(user,works))

console.log("done")