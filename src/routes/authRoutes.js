const express = require('express');
const sql = require('mssql');
// pass in bookRoutes as argument for debug
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router() {
	authRouter.route('/signUp')
		.post((req, res) => {
			debug(req.body);
			// create user
			req.login(req.body, () => {
				res.redirect('/auth/profile');
			});
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