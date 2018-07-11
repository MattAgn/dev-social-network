const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, {min: 2, max: 20})) {
    errors.name = 'Name must be bewteen 2 and 20 characters'
  }

  if (!Validator.isLength(data.password, {min: 6, max: 30})) {
    errors.password = 'Password must be bewteen 6 and 30 characters'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'The email is not valid';
  }
  
  
  if (Validator.isEmpty(data.name)) {
    errors.name = 'The name is required'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'The email is required'
  }
  
  if (Validator.isEmpty(data.password)) {
    errors.password = 'The password is required'
  }
  
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'The confirm password is required'
  }
  
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match'
  }
  
  return {
    errors,
    isValid: isEmpty(errors),
  }
};
