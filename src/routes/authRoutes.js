const express = require('express');
const sql = require('mssql');
const passport = require('passport');
// pass in bookRoutes as argument for debug
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router(nav) {
	authRouter.route('/signUp')
		.post((req, res) => {

			const { username, password } = req.body;
			const request = new sql.Request();

			(async function addUser(){
				let client;
				try {
					const results = await request.query('SELECT * FROM assistants')
					debug('Connected correctly to server');
					const user = { username, password };
					debug(user)
				} catch (err) {
					debug(err);
				}
				// login and create user, fetched from signup submit button
				req.login(results.ops[0], () => {
					res.redirect('/auth/profile');
				});
			}());

			debug(req.body);

			res.json(req.body);
		});
	authRouter.route('/signin')
		.get((req, res) => {
			res.render('signin', {
				nav,
				title: 'Sign In'
			});
		})
		.post(passport.authenticate('local', {
			successRedirect: '/auth/profile',
			failureRedirect: '/'
		}));
	// since the user is logged in, passport will attach the user to a request
	authRouter.route('/profile')
		.get((req, res) => {
			res.json(req,user);
		});
	return authRouter
};

module.exports = router;