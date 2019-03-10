// Module Imports
const Validator = require('validator')

// Local Imports
const isEmpty = require('./is-empty')

module.exports = function valiateRegisterInput(data) {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.gentder = !isEmpty(data.gender) ? data.gender : ''
  data.birthday = !isEmpty(data.birthday) ? data.birthday : ''
  data.feet = !isEmpty(data.feet) ? data.feet : ''
  data.inches = !isEmpty(data.inches) ? data.inches : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.password2 = !isEmpty(data.password2) ? data.password2 : ''

  // Name Validation
  if(Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required'
  }

  // Email Validation
  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  }

  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  // Gender Validation
  if(Validator.isEmpty(data.gender)) {
    errors.gender = 'Gender field is required'
  }

  // Birthday Validation
  if(Validator.isEmpty(data.birthday)) {
    errors.birthday = 'Birthday field is required'
  }

  // Height Validation
  if(Validator.isEmpty(data.feet)) {
    errors.feet = 'Feet field is required'
  }

  if(Validator.isEmpty(data.inches)) {
    errors.inches = 'Inches field is required'
  }

  // Password Validation
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required'
  }

  if(!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters'
  }

  if(Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required'
  }

  if(!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}