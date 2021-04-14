const jwt = require("jsonwebtoken")
const config = require("./config")
const User = require("../models/user")

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7)
  } else {
    req.token = null
  }
  
  next()
}
const userExtractor = async (req, res, next) => {
  const token = req.token
  const decodedToken = jwt.verify(token, config.secret)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" })
  }
  const user = await User.findById(decodedToken.id)
  req.user = user
  next()
}

module.exports = {
  tokenExtractor,
  userExtractor,
}
