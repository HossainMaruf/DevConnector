const validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateExperienceInput(data) {
	let errors = {};	

	// all the functions in validator need the string argument
	data.title = !isEmpty(data.title) ? data.title : '';
	data.company = !isEmpty(data.company) ? data.company : '';
	data.from = !isEmpty(data.from) ? data.from : '';

	if(validator.isEmpty(data.title)) {
		errors.title = "Title field is required";
	}
	if(validator.isEmpty(data.company)) {
		errors.company = "Company name field is required";
	}
	if(validator.isEmpty(data.from)) {
		errors.from = "From date field is required";
	}

	return {
		errors: errors,
		isValid: isEmpty(errors)
	}
}

// For checking the empty things, we can use the lodash library
// But best practice to minimize the third party packages
