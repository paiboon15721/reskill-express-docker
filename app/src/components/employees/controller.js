const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { requireAuth } = require('../auth/middleware')

module.exports = app => {
  const { Employee } = mongoose.models

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

  app.delete('/employees/:id', requireAuth, async (req, res) => {
    const employee = await Employee.findByIdAndDelete(req.params.id)
    res.send(employee)
  })

  app.post('/employees', requireAuth, bodyParser.json(), async (req, res) => {
    const employee = await Employee.create(req.body)
    res.send(employee)
  })

  app.put(
    '/employees/:id',
    requireAuth,
    bodyParser.json(),
    async (req, res) => {
      const employee = await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        },
      )
      res.send(employee)
    },
  )
}
