require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const { initMongoose } = require('./init-mongoose')

const { Employee } = mongoose.models

const app = express()

app.use(morgan('combined'))
app.use('/', express.static(`${__dirname}/public`))

app.get('/', (req, res) => {
  res.send({ hello: 'world' })
})

app.get('/employees', async (req, res) => {
  const employees = await Employee.find()
  res.send(employees)
})

const port = process.env.PORT || 3000
initMongoose().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
})
