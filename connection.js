const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

exports.db = () => {
  mongoose.connect(`${process.env.MONGO_URL}`, err => {
    if (err) {
      console.log(err)
    } else {
      console.log('Connection established with MongoDB')
    }
  })
}
