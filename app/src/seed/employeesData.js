const faker = require('faker')
const _ = require('lodash')

const roles = ['Manager', 'Developer', 'SA', 'HR']

const employee = {
  name: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  age: _.random(20, 50),
  salary: _.random(20000, 50000),
  role: roles[_.random(0, roles.length - 1)],
}

console.log(employee)
