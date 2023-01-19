const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    required: 'Email is mandatory'
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Blog',
      required: true
    }
  ],
  otp: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('User', userSchema)
