process.env.MONGO_DB_HOST = 'localhost'

const mongoose = require('mongoose')

require('./models/employee')

const { initMongoose } = require('./init-mongoose')

initMongoose().then(async () => {
  const data = await mongoose.models.Employee.find()

  console.log(data)
})
