// Module Imports
const Validator = require('validator')

// Local Imports
const isEmpty = require('./is-empty')

module.exports = function validateWeightInput(data) {
  let errors = {}

  data.weight = !isEmpty(data.weight) ? data.weight : ''
  data.date = !isEmpty(data.date) ? data.date : ''

  if(Validator.isEmpty(data.weight)) {
    errors.weight = 'Weight field is required'
  }

  if(!Validator.isNumeric(data.weight)) {
    errors.weight = 'Weight must be a number'
  }

  if(Validator.isEmpty(data.date)) {
    errors.date = 'Date field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}