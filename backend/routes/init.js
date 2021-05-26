const Readout = require("../models/Readout")
const User = require("../models/User")
const Study = require("../models/Study")

const router = require("express").Router()

router.get("/", async (req, res) => {
  try {
    await Readout.deleteMany({})
    await User.deleteMany({})
    await Study.deleteMany({})
  } catch (err) {
      console.log("err ",err)
      return res.send(err)
  }
  res.send("init!")
})
module.exports = router