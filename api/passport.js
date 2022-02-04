// we follow the JWT strategy
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/User');
const {SECRET_KEY} = require('./config');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = SECRET_KEY;


module.exports = (passport) => {
	passport.use(new JwtStrategy(options, (jwt_payload, done) => {
		User.findById(jwt_payload.id)
			.then(user => {
				if(user) {
					return done(null, user);
				} else {
					return done('Not Found', false);
				}
			})
			.catch(error => done('Something went wrong '+error, false));
	}));
}