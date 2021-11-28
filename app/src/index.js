require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const employeeController = require('./components/employees/controller')

const { initMongoose } = require('./init-mongoose')

const app = express()

app.use(morgan('combined'))
app.use('/', express.static(`${__dirname}/public`))

app.get('/', (req, res) => {
  res.send({ hello: 'world' })
})

employeeController(app)

const port = process.env.PORT || 3000
initMongoose().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
})
