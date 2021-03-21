const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	Uid: {type: String},
	DoctorName: {type: String},
	AffiliatedHospital: {type: String}
});
userSchema.index({Uid: 1});
module.exports = mongoose.model('UserData',userSchema);
