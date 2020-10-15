const dotenv = require('dotenv').config()
const DB_URL = process.env.DATABASE_URL
const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('Database connection established')
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports = InitiateMongoServer
