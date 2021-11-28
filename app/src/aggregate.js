require('dotenv').config()
const mongoose = require('mongoose')
const _ = require('lodash/fp')
const { initMongoose } = require('./init-mongoose')

const app = async () => {
  await initMongoose()
  const { Employee } = mongoose.models
  const employees = await Employee.find().lean()
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

  const pipeline = [
    { $match: { age: { $gt: 40 } } },
    // { $match: { salary: { $gt: 40000 } } },
    {
      $group: {
        _id: '$role',
        sum: { $sum: 1 },
        sumSalary: { $sum: '$salary' },
      },
    },
  ]
  const aggregate = await Employee.aggregate(pipeline)
  console.log(
    aggregate.reduce((acc, curr) => {
      acc[curr._id] = curr.sumSalary
      return acc
    }, {}),
  )
}

app()
