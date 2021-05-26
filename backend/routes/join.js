const usersRouter = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt-nodejs")
const saltRounds = 10

usersRouter.post("/", async (req, res, next) => {
  console.log("join ", req.body)
  const { Email, Password, DoctorName, Role, AffiliatedHospital } = req.body

  if (Email === undefined || Password === undefined) {
    res.status(400).end()
  } else if (DoctorName.length < 3 || Password.length < 3) {
    res.status(400).end()
  }

  bcrypt.hash(Password, saltRounds, (err, hashedpassword) => {
    if (err) {
      res.status(404).json({ success: false })
      next(err)
    }
    const user = new User({
      ...req.body,
      Password: hashedpassword,
    })
    const savedUser = await user.save()
    if (savedUser) {
      res.status(201).json({ ...savedUser, success: true })
    } else {
      res.status(404).json({ success: false })
    }
  })
})
module.exports = usersRouter
