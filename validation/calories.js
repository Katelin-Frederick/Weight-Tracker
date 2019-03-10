// Module Imports
const Validator = require('validator')

// Local Imports
const isEmpty = require('./is-empty')

module.exports = function validateCalorieInput(data) {
  let errors = {}

  data.calorie = !isEmpty(data.calorie) ? data.calorie : ''
  data.date = !isEmpty(data.date) ? data.date : ''

  if(Validator.isEmpty(data.calorie)) {
    errors.calorie = 'Calorie field is required'
  }

  if(!Validator.isNumeric(data.calorie)) {
    errors.calorie = 'Calorie must be a number'
  }

  if(Validator.isEmpty(data.date)) {
    errors.date = 'Date field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}