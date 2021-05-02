const mongoose = require("mongoose");

const StudySchema = new mongoose.Schema({
    StudyID:{type:String},
    PatientID: { type: String },
    PatientName: { type: String },
    PatientAge: { type: String  }, 
    PatientBirthDate: { type: String },
    PatientSex: { type: String },
    StudyDate: { type: String},
    Modality: { type: String},
    StudyDescription: { type: String },
    ReferringPhysicianName: { type: String },
    NumberOfImg: { type: String },
    ReadStatus: { type: String, default: '미판독' } //판독상태
});

module.exports = mongoose.model("Study",StudySchema);
