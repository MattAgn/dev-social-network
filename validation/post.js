const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, {min: 1, max: 500})) {
    errors.text = 'Your post must be between 1 and 500 characters'
  }
  
  if (Validator.isEmpty(data.text)) {
    console.log('data', data)
    errors.text = 'Some text  is required'
  }
  
  return {
    errors,
    isValid: isEmpty(errors),
  }
};
