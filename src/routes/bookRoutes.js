const express = require('express');
const bookRouter = express.Router();
const sql = require('mssql');
// pass in bookRoutes as argument for debug
const debug = require('debug')('app:bookRoutes');
const sessioncheck = require('../routes/sessionCheck');
function router(nav) {

	// visitor is only able to access dashboard if they are a valid user
	/*
	uncomment once we get user database working
	bookRouter.use((req, res, next) => {
		if (req.user) {
			next();
		} else {
			res.redirect('/');
		}
	});
	*/

	// routing to view the homepage
	bookRouter.route(sessioncheck, '/')
		.get((req, res) => {
/*
	Inside a function marked as async, you are allowed to place the await keyword
	in front of an expression that returns a promise. When you do, the execution of
	the async function is paused until the promise is resolved.
	Asynchronous Definition: of two or more events not existing or happening at
	the same time.
*/
			// Immediately Invoked Function Expression (IIFE)
			// There is a lot going on right here. Look up the concepts!

/*			(async function query() {

				const request = new sql.Request();
				// this returns a promise that sends back some desired result
				// but also includes error handling
				const result = await request.query('SELECT * FROM assistants ORDER BY Class')

				res.render(
					'dashboard', {
						nav,
				  		title: 'SiTE',
				  		// this is the sql table
				  		dashboard: result.recordset
				  	}
				);
			}());*/
			res.status(404).send("InvalidPage");
		});


	// routing to view a single assistant
	bookRouter.route('/:id')
		.get(sessioncheck, (req, res, next) => {
		if (req.params.id == req.userdata.uid && req.userdata.type == 1)
		{
			next();
		}
		else
		{
			debug("OHNO");
			res.status(401).send('Auth Failed');
		}
	},(req, res) => {
			debug(req.userdata);
			(async function query(){
				
				const id = req.params.id;
				const request = new sql.Request();
				const result = 
					await request.query('select * FROM assistants where cid in (SELECT cid FROM course WHERE id = '+req.userdata.uid+');');
				res.render(
					'dashboard', {
						nav,
				  		title: 'SiTE',
				  		dashboard: result.recordset,
				  		id: req.userdata.uid,
				  		type: req.userdata.type
			  		}
				);
			}());
		});
	// now that we've created bookRouter, return it.
	return bookRouter;
}

// let the other files know about router
module.exports = router;