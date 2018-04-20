const express = require('express');
const sql = require('mssql');
// pass in bookRoutes as argument for debug
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router() {
	authRouter.route('/signUp')
		.post((req, res) => {
			debug(req.body);
			res.json(req.body);
		});
	return authRouter
};

module.exports = router;