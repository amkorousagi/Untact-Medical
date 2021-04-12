const mongoose = require('mongoose');

const readOutSchema = new mongoose.Schema({
    ReadId: { type: String, unique: true }, //고유 판독 결과 (한 검사에 여러 판독결과)
    StudyId: { type: String }, //연결되는 Study
    ReadText: { type: String }, //상세 판독 결과
    ReadResult: { type: String }, // 정상, 비정상 의견
    URL: { type: String } // 그린 이미지 URL
});

module.exports = mongoose.model('ReadOut', readOutSchema);