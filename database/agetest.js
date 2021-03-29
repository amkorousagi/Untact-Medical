var mongoose = require('mongoose'),	//몽구스와 연결
	Schema = mongoose.Schema;
var dinfo = require('./models/dicominfo');	//dicom정보 스키마와 연결해 모델 가져옴
var db = mongoose.connect('mongodb://localhost:27017/DICOM');	//DB와 연결
mongoose.connection.on('open',function() {
	console.log('Mongoose connected.');
});

dinfo.findOne({},function(err,docs){
	if (err) console.log(err);
	var now = new Date();
	var s = docs.PatientBirthDate;
	console.log(s);
	var age = now.getFullYear()-s.getFullYear()+1;
	console.log(age);
});
