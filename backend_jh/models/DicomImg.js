const mongoose = require('mongoose');

const dImgSchema = new mongoose.Schema({
	Imgid: {type : mongoose.Schema.Types.ObjectId, ref:'DICOMInfo'},
	FileName: {type: String},
	NumOfImg: {type: Number}
});

module.exports = mongoose.model('DICOMImg',dImgSchema);