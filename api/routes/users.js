// initialize route
const router = require("express").Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require("../config.js");

// custom modules (Schema)
const User = require("../models/User.js");
const Post = require("../models/Post.js");

// Load Validation Register
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

/**
 * @route POST /api/users/register
 * @desc registration of new user
 * @access public route
 */
router.post('/register', (req, res) => {
	const {errors, isValid} = validateRegisterInput(req.body);
	// validate input
	if(!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({email: req.body.email})
		.then(user => {
			if(user) {
				errors.email = 'Email already exist';
				return res.status(400).json(errors);
			} else {
				const avatar = gravatar.url(req.body.email, {
					s: '200', // size
					r: 'pg', // rating
					d: 'mm' // default
				});
				const newUser = new User({
					name: req.body.name,
					email: req.body.email,
					avatar: avatar,
					password: req.body.password
				});
				// password hashing
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hashPassword) => {
						if(err)	throw err;
						newUser.password = hashPassword;
						newUser.save().then(user => res.json(user)).catch(error => {
							errors.userNotSaved = "User not saved";
							res.json(errors);
						});
					});
				});
			}	
		});
})

/**
 * @route POST /api/users/login
 * @desc login of user
 * @access public route
 */
 router.post('/login', (req, res) => {
	const {errors, isValid} = validateLoginInput(req.body);
	// validate input
	if(!isValid) {
		return res.status(400).json(errors);
	}
 	const email = req.body.email;
 	const password = req.body.password;
 	// find the user by email
 	User.findOne({email: email})
 		.then(user => {
 			if(!user) {
 				errors.email = "User not found";
 				return res.status(400).json(errors);
 			} else {
 				// user found
 				// now check the password
 				bcrypt.compare(password, user.password)
 					.then(isMatch => {
 						if(isMatch) {
 							// User Matched
 							// create the payload
 							const payload = {id: user._id, name: user.name, email: user.email, avatar: user.avatar};
 							// Sign Token
 							jwt.sign(payload, SECRET_KEY, {expiresIn: 3600}, (err, token) => {
 								if(err)	throw err;
 								res.status(200).json({
 									Success: true,
 									token: 'Bearer '+token
 								});
 							});
 						} else {
 							errors.password = 'Password is incorrect';
 							res.status(400).json(errors);
 						}
 					})
 					.catch(error => res.json('Something went wrong'));
 			}
 		})
 		.catch(error => res.json('Something went wrong'));
 })

 /**
 * @route GET /api/users/current
 * @desc Get the current user
 * @access Private
 */

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
	return res.json({
		id: req.user._id,
		name: req.user.name,
		email: req.user.email,
	});
}); 

module.exports = router;