require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

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

app.get('/employees/:id', async (req, res) => {
  const employee = await Employee.findById(req.params.id)
  if (!employee) {
    res.status(404).send({
      message: 'Data not found',
    })
    return
  }
  res.send(employee)
})

app.delete('/employees/:id', async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id)
  res.send(employee)
})

app.post('/employees', bodyParser.json(), async (req, res) => {
  const employee = await Employee.create(req.body)
  res.send(employee)
})

const port = process.env.PORT || 3000
initMongoose().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
})
