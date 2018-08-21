const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills =
    !isEmpty(data.skills) || data.skills.length > 0 ? data.skills : "";
  data.website = !isEmpty(data.website) ? data.website : "";
  data.youtube = !isEmpty(data.youtube) ? data.youtube : "";
  data.facebook = !isEmpty(data.facebook) ? data.facebook : "";
  data.instagram = !isEmpty(data.instagram) ? data.instagram : "";
  data.twitter = !isEmpty(data.twitter) ? data.twitter : "";
  data.linkedin = !isEmpty(data.linkedin) ? data.linkedin : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "The handle must be between 2 and 40 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    console.log("data", data);
    errors.handle = "The profile handle is required";
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills are required";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "The status is required";
  }

  if (!Validator.isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }

  if (!Validator.isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  if (!Validator.isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }

  if (!Validator.isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  if (!Validator.isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!Validator.isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
