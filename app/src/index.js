require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express')
const controllers = require('./components')

const { initMongoose } = require('./init-mongoose')

const app = express()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null))
app.use(morgan('combined'))
app.use('/', express.static(`${__dirname}/public`))

app.get('/', (req, res) => {
  res.send({ hello: 'world', appId: process.env.APPID })
})

controllers.forEach(x => x(app))

const port = process.env.PORT || 3000
initMongoose().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
})
