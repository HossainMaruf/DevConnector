// initialize route
const router = require("express").Router();
const bcrypt = require("bcrypt");
// custom modules (Schema)
const User = require("../models/User.js");

// register a user
router.post('/register', async (req, res, next) => {
	// generates salt
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);
	req.body.password = hashedPassword;
	const newUser = new User(req.body);
	try {
		const savedUser = await newUser.save();
		res.status(200).json(savedUser);
	} catch(error) {
		res.status(500).json(error);
	}
});

// login a user
router.post('/login', async (req, res, next) => {
	try {
		const user = await User.findOne({email: req.body.email});
		!user && res.status(400).json('User not found');
		const validPassword = await bcrypt.compare(req.body.password, user.password);
		!validPassword && res.status(400).json('Password is incorrect');
		res.status(200).json(user);
	} catch(error) {
		res.status(500).json(error);
	}
});

module.exports = router;