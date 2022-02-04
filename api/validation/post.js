const validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validatePostInput(data) {
	let errors = {};	

	// all the functions in validator need the string argument
	data.text = !isEmpty(data.text) ? data.text : '';

	if(!validator.isLength(data.text, {min: 10, max: 300})) {
		errors.text = "Text must be between 10 and 300 characters";
	}

	if(validator.isEmpty(data.text)) {
		errors.text = "Text field is required";
	}

	return {
		errors: errors,
		isValid: isEmpty(errors)
	}
}

// For checking the empty things, we can use the lodash library
// But best practice to minimize the third party packages
