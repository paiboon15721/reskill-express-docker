const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema(
  {
    email: { type: String, trim: true, required: true, index: true },
    password: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

mongoose.model('User', userSchema)
