const usersRouter = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt-nodejs")
const saltRounds = 10

usersRouter.post("/", async (req, res, next) => {
  console.log("join ",req.body)
  try {
    const { Email, Password, DoctorName, Role, AffiliatedHospital } = req.body

    if (Email === undefined || Password === undefined) {
      res.status(400).end()
    } else if (DoctorName.length < 3 || Password.length < 3) {
      res.status(400).end()
    }

    const hashedpassword = await bcrypt.hash(Password, saltRounds)

    const user = new User({
      ...req.body,
      Password: hashedpassword,
    })

    const savedUser = await user.save()
    if (savedUser) {
      res.status(201).json({...savedUser,success:true})
    } else {
      res.status(404).end({success:false})
    }
  } catch (err) {
    res.status(404).end({success:false})
    next(err)
  }
})
module.exports = usersRouter
