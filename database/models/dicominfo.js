const mongoose = require('mongoose');

const dInfoSchema = new mongoose.Schema({
	//IndexId: {type: Number},	//순번
	StudyDate: {type : Date},	//촬영일자
	Modality: {type: String},	//검사장비구분
	InstitutionName: {type: String},//촬영병원명
	StudyDescription: {type: String},//검사정보
	PatientName: {type: String},	//환자명
	PatientID: {type: String},	//차트번호
	PatientBirthDate: {type : Date},//생년월일
	PatientAge: {type : Number},	//촬영당시 나이
	PatientSex: {type: String},	//성별
	ReadingStatus: {type: String},//판독상태
	DoctorName: {type: String},	//판독의사명
	ReadingResult: {type: String},//판독결과(간략한)
	RequestDate: {type : Date, default: Date.now},//의뢰일자
	ReadingDate: {type : Date},	//판독일자
	Request: {type: String},	//요구사항
	DICOMUrl: {type: String},	//dcm경로
	NumOfImg: {type: Number},	//dcm이미지 수
	ReadingText: {type: String},	//상세 판독 결과
	DrawnImgUrl: {type: String}	//그린 이미지
});
//dInfoSchema.index({IndexId:1});
module.exports = mongoose.model('DICOMInfo',dInfoSchema);
