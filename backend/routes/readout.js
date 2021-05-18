const readoutRouter = require("express").Router()
const Readout = require("../models/readout")
const Study = require("../models/Study")
const multer = require("multer")
const fs = require("fs")
const { update } = require("../models/Study")

readoutRouter.get("/:id", async (req, res) => {
  if (!req.params.id) {
    const readouts = await Readout.find({})
    res.json(readouts)
  }
  const readout = await Readout.findById(req.params.id)
  res.json(readout)
})

// 이미지 총 개수와 상위 디렉토리이름 = 스터디 id
readoutRouter.post(
  "/",
  async (req, res, next) => {
    //await Readout.deleteMany({})
    const readout = await Readout.create({
      ReadId: "" + Math.random() * 90 * 90,
    })
    console.log("new", readout)
    req.readout_id = readout._id
    next()
  },
  async (req, res) => {
    const new_readout = {
      ReadId: "" + req.readout_id,
      StudyId: req.body.studyId,
      UserId: "none", //req.user._id,
      ReadText: req.body.readText,
      ReadResult: req.body.readResult,
      NumberOfImg: "" + req.body.numberOfImg,
      Canvases: req.body.canvases,
    }
    console.log("req ", new_readout)



    const updated_readout = await Readout.findByIdAndUpdate(
      req.readout_id,
      {...new_readout},
      {new: true}
    ).exec()
    console.log("up ", updated_readout)



    const result = await Study.findByIdAndUpdate(
      updated_readout.StudyId,
      {
        ReadStatus: updated_readout.ReadResult,
        ReadId: updated_readout.ReadId,
      },
      {new: true}
    ).exec()
    console.log("study", result)


    res.json(updated_readout)
  }
)
module.exports = readoutRouter
