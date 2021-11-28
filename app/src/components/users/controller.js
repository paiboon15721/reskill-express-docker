const mongoose = require('mongoose')

module.exports = app => {
  const { User } = mongoose.models
  app.get('/users', async (req, res) => {
    const users = await User.find()
    res.send(users)
  })
}
