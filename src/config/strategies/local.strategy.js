const passport = require('passport');
const { Strategy } = require('passport-local');
const sql = require('mssql');
const debug = require('debug')('app:local.strategy');

// This function just tells passport about our local strategy
module.exports = function localStrategy() {
	passport.use(new Strategy(
		{
			usernameField: 'username',
			passwordField: 'password'
		}, (username, password, done) => {

			const request = new sql.Request();

			(async function addUser(){
				//let client;
				try {
					const results = await request.query('SELECT * FROM assistants')
					debug('Connected correctly to server');
					const user = { username, password };
					debug(user)
					// see if the user is in the database
					// TODO 

					/*
					const user = await some sql call
					if(user.password === password){
						done(null, user);
					} else {
						// pass null because it didn't err, just failed
						done(null, false);
					}
					*/
				} catch (err) {
					debug(err);
				}
				// login and create user, fetched from signup submit button
				req.login(results.ops[0], () => {
					res.redirect('/auth/profile');
				});
			}());

			const user = {
				username, password
			};
			done(null, user);
		}));
};