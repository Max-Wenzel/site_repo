const express = require('express');
const sql = require('mssql');
// pass in bookRoutes as argument for debug
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router() {
	authRouter.route('/signUp')
		.post((req, res) => {

			const request = new sql.Request();

			(async function addUser(){
				let client;
				try {
					const results = await request.query('SELECT * FROM assistants')
					debug('Connected correctly to server');
				} catch (err) {
					debug(err);
				}
				// login and create user, fetched from signup submit button
				debug(results);
				req.login(results.ops[0], () => {
					res.redirect('/auth/profile');
				});
			}());

			debug(req.body);

			res.json(req.body);
		});
	// since the user is logged in, passport will attach the user to a request
	authRouter.route('/profile')
		.get((req, res) => {
			res.json(req,user);
		});
	return authRouter
};

module.exports = router;