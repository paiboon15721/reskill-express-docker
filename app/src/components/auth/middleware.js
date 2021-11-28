const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

exports.requireAuth = async (req, res, next) => {
  try {
    const userJwt = jwt.verify(req.headers.jwt, process.env.JWT_SECRET)
    const user = await mongoose.models.User.findById(userJwt.id)
    req.user = user
    next()
  } catch (e) {
    res.status(400).send({ message: 'Token is invalid' })
  }
}
