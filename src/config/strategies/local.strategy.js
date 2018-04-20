const passport = require('passport');
const { Strategy } = require('passport-local');

// This function just tells passport about our local strategy
module.exports = function localStrategy() {
	passport.use(new Strategy(
		{
			usernameField: 'username',
			passwordField: 'password'
		}, (username, password, done) => {
			const user = {
				username, password
			};
			done(null, user);
		}));
};