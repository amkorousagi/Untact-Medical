const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	Email: {type: String},
	PassWord: {type: String},
	DoctorName: {type: String},
	Role: {type: String},	//요청자, 판독자
	AffiliatedHospital: {type: String}	//소속 병원
});
userSchema.index({Email: 1});
module.exports = mongoose.model('UserData',userSchema);
