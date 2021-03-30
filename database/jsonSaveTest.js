var mongoose = require('mongoose'),	//몽구스와 연결
	Schema = mongoose.Schema;
var dinfo = require('./models/dicominfo');	//dicom정보 스키마와 연결해 모델 가져옴
var db = mongoose.connect('mongodb://localhost:27017/DICOM');	//DB와 연결
mongoose.connection.on('open',function() {
	console.log('Mongoose connected.');
});

console.log('data1');

const fs = require('fs');
var data = fs.readFileSync('./qwer.json');	//json연결 (나중엔 동적으로 받아야함)
let a = JSON.parse(data);	//객체로 파싱
if (a.PatientAge == 'No data'){
	if ((a.PatientBirthDate!='No data')&&(a.StudyData!='No Data')){
		a.PatientAge = a.StudyData.getFullYear() - a.PatientBirthDate.getFullYear()+1
	}
}
var di = new dinfo();		//모델 인스턴스 생성
Object.assign(di,a);		//모델 인스턴스에 파싱된Json 할당

di.save(function (err){	//DB에 저장
	if (err) console.log('err');
});
console.log(di.RequestDate);

