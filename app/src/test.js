require('dotenv').config()
const jwt = require('jsonwebtoken')

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYTMyMDM3MmFmOWFjMzlmMjBkNWY1MSIsImVtYWlsIjoiam9objRAZ21haWwuY29tIiwiaWF0IjoxNjM4MDgwNTk4fQ.QdGmTT0bgZPr8MED_L0bzip2-W2gVKmAaHl1DjcMct4'

const result = jwt.verify(token, process.env.JWT_SECRET)
console.log(result)
