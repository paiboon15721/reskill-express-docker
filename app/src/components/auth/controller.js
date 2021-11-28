const bodyParser = require('body-parser')
const mongoose = require('mongoose')

module.exports = app => {
  const { User } = mongoose.models

  app.post('/auth/register', bodyParser.json(), async (req, res) => {
    const { body } = req
    const exist = await User.findOne({ email: body.email })
    if (exist) {
      res.status(400).send({ message: 'email is in use' })
      return
    }
    const user = await User.create(body)
    res.send(user)
  })
}
