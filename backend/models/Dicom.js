const mongoose = require("mongoose");

//uniquekey 정의 필요!

const DicomSchema = new mongoose.Schema({
    PatientID: { type: String, required: true },
    PatientName: { type: String, required: true },
    PatientAge: { type: String, required: true }, 
    PatientBirthDate: { type: String, required: true },
    PatientSex: { type: String, required: true },
    StudyData: { type: String, required: true },
    Modality: { type: String, required: true },
    StudyDescription: { type: String, required: true },
    ReferringPhysicianName: { type: String, required: true },
    NumberOfImg: { type: String, required: true },
    Path: {type:String,required:true},
});

const Dicom = mongoose.model("Dicom",DicomSchema);
module.exports={Dicom};