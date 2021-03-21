const mongoose = require('mongoose');

const dInfoSchema = new mongoose.Schema({
	StudyDate: {type : Date},
	ModalityMG: {type: String},
	InstitutionName: {type: String},
	StudyDescription: {type: String},
	PatientName: {type: String},
	PatientID: {type: String},
	PatientBirthDate: {type : Date},
	PatientSex: {type: String},	
	ReadingStatus: {type: String},
	DoctorName: {type: String},
	ReadingResult: {type: String},
	RequestDate: {type : Date, default: Date.now},
	ReadingDate: {type : Date},
	Request: {type: String},
	DICOMUrl: {type: String},
	NumOfImg: {type: Number}
});

module.exports = mongoose.model('DICOMInfo',dInfoSchema);
