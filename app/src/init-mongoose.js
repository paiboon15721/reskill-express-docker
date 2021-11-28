const mongoose = require('mongoose')

require('./models/employee')
require('./models/user')

exports.initMongoose = () =>
  new Promise((resolve, reject) => {
    const url = `mongodb://${process.env.MONGO_DB_HOST}:27017/reskill`
    mongoose.connect(url).catch(reject)

    mongoose.connection.once('open', () => {
      console.log(`Connected mongodb ${url}`)
      resolve()
    })
  })
