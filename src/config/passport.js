const passport = require('passport');

module.exports = function passportConfig(app) {
	
	app.use(passport.initialize());
	app.use(passport.session());

	// Stores user in session
	passport.serializeUser((user, done) => {
		// check the first argument for a problem
		done(null, user);
	});
	
	// Retrieves user from session
	passport.deserializeUser((userId, done) => {
		done(null, user);
	});

	require('./strategies/local.stragey');
};