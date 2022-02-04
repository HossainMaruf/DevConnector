const validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateLoginInput(data) {
	let errors = {};	

	// all the functions in validator need the string argument
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	// email validation
	if(validator.isEmpty(data.email)) {
		errors.email = "Email field is required";
	}
	if(!validator.isEmail(data.email)) {
		errors.email = "Email is invalid";
	}
	// password validation
	if(!validator.isLength(data.password, {min: 6, max: 13})) {
		errors.password = "Password must be between 6 and 13 characters";
	}
	if(validator.isEmpty(data.password)) {
		errors.password = "Password field is required";
	}

	return {
		errors: errors,
		isValid: isEmpty(errors)
	}
}

// For checking the empty things, we can use the lodash library
// But best practice to minimize the third party packages