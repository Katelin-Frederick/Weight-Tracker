const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  feet: {
    type: Number,
    required: true
  },
  inches: {
    type: Number,
    required: true
  },
  weights: [
    {
      weight: {
        type: Number
      },
      date: {
        type: Date
      }
    }
  ],
  calories: [
    {
      calorie: {
        type: Number
      },
      date: {
        type: Date
      }
    }
  ]
})

module.exports = User = mongoose.model('users', UserSchema)