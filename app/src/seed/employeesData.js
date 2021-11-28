require('dotenv').config()
const faker = require('faker')
const _ = require('lodash')
const fs = require('fs')
const mongoose = require('mongoose')

const { initMongoose } = require('../init-mongoose')

const roles = ['Manager', 'Developer', 'SA', 'HR']

const createEmployee = () => ({
  name: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  age: _.random(20, 50),
  salary: _.random(20000, 50000),
  role: roles[_.random(0, roles.length - 1)],
})

const emps = _.range(100).map(createEmployee)

fs.writeFileSync(`${__dirname}/employees.json`, JSON.stringify(emps))

const main = async () => {
  await initMongoose()
  await mongoose.connection.dropDatabase()
  const { Employee } = mongoose.models
  await Employee.insertMany(emps)
  const employees = await Employee.find()
  console.log(employees)
  process.exit(0)
}

main()
