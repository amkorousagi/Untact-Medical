const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt-nodejs")
const loginRouter = require("express").Router()
const User = require("../models/User")
const config = require("../utils/config")

loginRouter.post("/", async (req, res) => {
  const body = req.body
  const user = await User.findOne({ Email: body.Email })
  if (user) {
    bcrypt.compare(body.Password, user.Password, (err, hash) => {
      if (err) {
        console.log(err)
        return res.end(err)
      }

      const passwordCorrect = user === null ? false : hash

      console.log("body ", body)
      console.log("user ", user)
      console.log("passwordCorrect ", passwordCorrect)
      if (!(user && passwordCorrect)) {
        return res
          .status(401)
          .json({ error: "invalid username or password", success: false })
      }

      const userForToken = {
        DoctorName: user.DoctorName,
        id: user._id,
      }

      const token = jwt.sign(userForToken, config.secret, {
        expiresIn: 60 * 60 * 24 * 3,
      })

      res.status(200).json({ token, success: true })
    })
  } else {
    res.status(400).json({ err:"not user" })
  }
})
module.exports = loginRouter
