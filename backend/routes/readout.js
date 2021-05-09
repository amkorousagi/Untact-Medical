const readoutRouter = require("express").Router()
const Readout = require("../models/readout")
const multer = require("multer")
const fs = require("fs")

readoutRouter.get("/:id", async (req, res) => {
  if (!req.params.id) {
    const readouts = await Readout.find({})
    res.json(readouts)
  }
  const readout = await Readout.findById(req.params.id)
  res.json(readout)
})

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    console.log("dest")
    cb(null, "images/" + req.study_id)
  },
  //하단 주석처리시 images/폴더안에 난수로 파일 저장->난수는 DB에 저장
  filename: (req, file, cb) => {
    console.log("file")
    req.cnt++
    console.log("cnt", req.cnt)
    cb(null, "" + req.cnt + path.extname(file.originalname))
  },
})
const upload = multer({ storage: storage })
let options = {
  scriptPath: "",
  args: [""],
}
// 이미지 총 개수와 상위 디렉토리이름 = 스터디 id
readoutRouter.post(
  "/",
  async (req, res, next) => {
    //await Readout.deleteMany({})
    console.log("start")
    const readout = await Readout.create({})
    console.log("study", readout)
    req.readout_id = readout._id
    req.cnt = 0
    !fs.existsSync("images/" + readout._id) &&
      fs.mkdirSync("images/" + readout._id)
    next()
  },
  upload.array("image"),
  async (req, res, next) => {
    const new_readout = {
      ReadId: req.readout_id,
      StudyId: req.studyId,
      UserId: req.user._id,
      ReadText: req.readText,
      ReadResult: req.readResult,
      NumberOfImg: "" + req.cnt,
    }
    console.log(new_readout)
    //callback을 쓰자
    const updated_readout = await Readout.findByIdAndUpdate(
      req.readout_id,
      new_readout,
      (err, res) => {
        if (err) {
          console.log("err", err)
        }
        console.log("res", res)
        return res
      }
    )
    res.json(updated_readout)
  }
)
module.exports = readoutRouter