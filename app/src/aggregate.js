require('dotenv').config()
const mongoose = require('mongoose')
const _ = require('lodash/fp')
const { initMongoose } = require('./init-mongoose')

const app = async () => {
  await initMongoose()
  const { Employee } = mongoose.models
  const employees = await Employee.find().lean()
  // const mappedEmps = employees
  //   .filter(x => x.age > 40)
  //   .map(x => ({ ...x, name: `Mr. ${x.name}` }))
  //   .map(x => ({ ...x, age: x.age + 30 }))
  //   .reduce((acc, curr) => (acc += curr.salary), 0)
  const res = {
    HR: 2142424,
    Manager: 2343242342,
    Developer: 324324324324,
  }
  const mappedEmps = _.pipe(
    _.filter(x => x.age > 40),
    _.map(x => ({ ...x, name: `Mr. ${x.name}` })),
    _.groupBy('role'),
    _.entries,
    _.reduce(
      (acc, [role, xs]) => ({
        ...acc,
        [role]: _.sumBy('salary')(xs),
      }),
      {},
    ),
  )(employees)
  console.log(mappedEmps)
}

app()
