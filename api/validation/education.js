const validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateEducationInput(data) {
	let errors = {};	

	// all the functions in validator need the string argument
	data.school = !isEmpty(data.school) ? data.school : '';
	data.degree = !isEmpty(data.degree) ? data.degree : '';
	data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
	data.from = !isEmpty(data.from) ? data.from : '';

	if(validator.isEmpty(data.school)) {
		errors.school = "School field is required";
	}
	if(validator.isEmpty(data.degree)) {
		errors.degree = "Degree field is required";
	}
	if(validator.isEmpty(data.fieldofstudy)) {
		errors.fieldofstudy = "Fieldofstudy field is required";
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
