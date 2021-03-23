const mongoose = require("mongoose");

const DicomSchema = new mongoose.Schema({
    PatientID: { type: String, unique: true, required: true },
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