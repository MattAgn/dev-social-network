const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  let errors = {};
  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  data.field_of_study = !isEmpty(data.field_of_study) ? data.field_of_study : '';
  
  if (Validator.isEmpty(data.school)) {
    console.log('data', data)
    errors.school = 'The school is required'
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = 'The degree is required'
  }

  if (Validator.isEmpty(data.field_of_study)) {
    errors.field_of_study = 'The field of study is required'
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date is required'
  }
  
  return {
    errors,
    isValid: isEmpty(errors),
  }
};
