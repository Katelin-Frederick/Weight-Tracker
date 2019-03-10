// Module Imports
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

// Local Imports
const User = require('../../models/User')
const keys = require('../../config/keys')

// Load Input Validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')
const validateWeightInput = require('../../validation/weights')
const validateCalorieInput = require('../../validation/calories')

// @route   POST api/users/register
// @desc    Register
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  // Check Validation
  if(!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        errors.email = 'Email already exists'
        return res.status(400).json(errors)
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          gender: req.body.gender,
          birthday: req.body.birthday,
          feet: req.body.feet,
          inches: req.body.inches,
          password: req.body.password
        })

        // Encrypt Password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err
            newUser.password = hash
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        })
      }
    })
})

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  // Check Validation
  if(!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email
  const password = req.body.password

  // Find User by Email
  User.findOne({ email })
    .then(user => {
      // Check for User
      if(!user) {
        errors.email = 'User not found'
        return res.status(404).json(errors)
      }

      // Check Password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            // Create JWT Payload
            const payload = { id: user.id, name: user.name }

            // Sign Token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                })
              }
            )
          } else {
            errors.password = 'Password incorrect'
            return res.status(400).json(errors)
          }
        })
    })
})

// @route   GET api/users/current
// @desc    Get Current User
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    feet: req.user.feet,
    inches: req.user.inches,
    birthday: req.user.birthday,
    gender: req.user.gender,
    weights: req.user.weights,
    calories: req.user.calories
  })
})

// @route   POST api/users/weights
// @desc    Add Weight to Profile
// @access  Private
router.post('/weights', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateWeightInput(req.body)

  // Check Validation
  if(!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors)
  }

  User.findOne({ _id: req.user.id })
    .then(user => {
      const newWeight = {
        weight: req.body.weight,
        date: req.body.date
      }

      user.weights.unshift(newWeight)

      user.save().then(user => res.json(user))
    })
})

// @route   DELETE api/users/weights/:weight_id
// @desc    Delete a Weight
// @access  Private
router.delete('/weights/:weight_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findOne({ _id: req.user.id })
    .then(user => {
      const removeIndex = user.weights
        .map(item => item.id)
        .indexOf(req.params.weight_id)

        user.weights.splice(removeIndex, 1)

        user.save().then(user => res.json(user))
    }).catch(err => res.status(404).json(err))
  }
)

// @route   POST api/users/calories
// @desc    Add Calories to Profile
// @access  Private
router.post('/calories', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateCalorieInput(req.body)

  // Check Validation
  if(!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors)
  }

  User.findOne({ _id: req.user.id })
    .then(user => {
      const newCalorie = {
        calorie: req.body.calorie,
        date: req.body.date
      }

      user.calories.unshift(newCalorie)

      user.save().then(user => res.json(user))
    })
})

// @route   DELETE api/users/calories/:calorie_id
// @desc    Delete Calories
// @access  Private
router.delete('/calories/:calorie_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findOne({ _id: req.user.id })
    .then(user => {
      const removeIndex = user.calories
        .map(item => item.id)
        .indexOf(req.params.calorie_id)

        user.calories.splice(removeIndex, 1)

        user.save().then(user => res.json(user))
    }).catch(err => res.status(404).json(err))
  }
)

// @route   DELETE api/users
// @desc    Delete User
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findOneAndRemove({ _id: req.user.id })
    .then(() => res.json({ success: true }))
})

module.exports = router