const jwt = require('jsonwebtoken');
const debug = require('debug')('app:sessionCheck');
const bodyParser = require('body-parser');

module.exports = (req, res, next) =>
{
	try {
		const decoded = jwt.verify(req.session.token, 'superSecret');
		req.userdata = decoded;
		next();
	} catch (error)
	{
		res.status(401).send('Auth Check Failed');
	}
};