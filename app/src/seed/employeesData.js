const faker = require('faker')
const _ = require('lodash')

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

console.log(emps)
// console.log(createEmployee())
// console.log(createEmployee())
// console.log(createEmployee())
// console.log(createEmployee())
