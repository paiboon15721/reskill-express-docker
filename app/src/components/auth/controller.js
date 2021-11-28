const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = app => {
  const { User } = mongoose.models

  app.post('/auth/register', bodyParser.json(), async (req, res) => {
    const { body } = req
    const exist = await User.findOne({ email: body.email })
    if (exist) {
      res.status(400).send({ message: 'email is in use' })
      return
    }
    const hash = await bcrypt.hash(body.password, 10)
    const user = await User.create({ ...body, password: hash })
    res.send(user)
  })

  app.post('/auth/login', bodyParser.json(), async (req, res) => {
    const { body } = req
    const user = await User.findOne({ email: body.email })
    if (!user) {
      res.status(400).send({
        message: 'Email or password is invalid',
      })
      return
    }

    const result = await bcrypt.compare(body.password, user.password)

    if (!result) {
      res.status(400).send({
        message: 'Email or password is invalid',
      })
      return
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
    )

    res.send({ token })
  })

  app.get(
    '/auth/profile',
    async (req, res, next) => {
      try {
        const userJwt = jwt.verify(req.headers.jwt, process.env.JWT_SECRET)
        const user = await User.findById(userJwt.id)
        req.user = user
        next()
      } catch (e) {
        res.status(400).send({ message: 'Token is invalid' })
      }
    },
    async (req, res) => {
      const user = await User.findById(req.user.id, { password: 0 })
      res.send(user)
    },
  )
}
