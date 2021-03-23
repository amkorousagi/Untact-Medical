//require the mongoClient from mongodb module
var MongoClient = require('mongodb').MongoClient;

//mongodb configs
var connectionUrl = 'mongodb://localhost:27017/DICOM',
sampleCollection = 'Info';

//We need to insert these chapters into mongoDB
var Info = [{
'StudyDate': '2021.03.12',
'Modality MG': 'CR',
'InstitutionName': '경대병원',
'StudyDescription': '위 염증 증상',
'PatientName': '김철수',
'PatientID': 'A23456',
'PatientBirthDate': '1999.12.11',
'PatientSex': 'M',
'ReadingStatus': '미판독',
'DoctorName': '나판독',
'ReadingResult': '정상',
'RequestDate': '2021.03.13',
'ReadingDate': '2021.03.14',
'Request': '?? 여긴 뭐가 들어가죠?',
'DICOMUrl': 'home/DICOM/A23456'
}];

MongoClient.connect(connectionUrl, { useNewUrlParser: true}, function(err, client) {

console.log("Connected correctly to server");
var db = client.db('DICOM');

// Get some collection
var collection = db.collection(sampleCollection);

collection.insertMany(Info,function(error,result){
//here result will contain an array of records inserted
if(!error) {
console.log("Success :"+result.ops.length+" Info inserted!");
} else {
console.log("Some error was encountered!");
}
client.close();
});
});
