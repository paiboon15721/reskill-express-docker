const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// bcrypt.hash('1234', 10).then(hash => {
//   console.log(hash)

//   bcrypt.compare('12345', hash).then(res => {
//     console.log('result', res)
//   })
// })

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
}
