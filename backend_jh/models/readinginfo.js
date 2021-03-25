const mongoose = require('mongoose');

const rInfoSchema = new mongoose.Schema({
	ReadingId: {type : mongoose.Schema.Types.ObjectId, ref:'DICOMInfo'},
	ReadingText: {type: String},
	FileName: {type: String},
});

module.exports = mongoose.model('ReadingInfo',rInfoSchema);