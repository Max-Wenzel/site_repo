const express = require('express');
const sql = require('mssql');
const passport = require('passport');
const bcrypt = require('bcrypt');


const signinRouter = express.Router();

function router(nav) {
	signinRouter.route('/')
		.get((req, res) => {
			res.render('signin', {
				nav,
				title: 'Sign In',
				error: req.session.error,
				found: req.session.found
			});
			req.session.destroy();
		});
	return signinRouter;
}
module.exports = router;