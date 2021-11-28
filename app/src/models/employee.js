const mongoose = require('mongoose')

const { Schema } = mongoose

const employeeSchema = new Schema(
  {
    name: String,
    lastName: String,
    email: String,
    age: Number,
    salary: Number,
    role: String,
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

mongoose.model('Employee', employeeSchema)
