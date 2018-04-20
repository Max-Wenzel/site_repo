const express = require('express');
const bookRouter = express.Router();
const sql = require('mssql');
// pass in bookRoutes as argument for debug
const debug = require('debug')('app:bookRoutes');

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
	bookRouter.route('/')
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
			(async function query() {

				const request = new sql.Request();
				// this returns a promise that sends back some desired result
				// but also includes error handling
				const result = await request.query('SELECT * FROM assistants')

				res.render(
					'dashboard', {
						nav,
				  		title: 'SiTE',
				  		// this is the sql table
				  		dashboard: result.recordset
				  	}
				);
			}());
		});


	// routing to view a single assistant
	bookRouter.route('/:id')
		.get((req, res) => {
			(async function query(){
				
				const id = req.params.id;
				const request = new sql.Request();
				const result = 
					await request.input('id', sql.Int, id)
						.query('SELECT * FROM assistants WHERE id = @id');
				res.render(
					'assistant', {
						nav,
				  		title: 'SiTE',
				  		dashboard: result.recordset[0]
			  		}
				);
			}());
		});
	// now that we've created bookRouter, return it.
	return bookRouter;
}

// let the other files know about router
module.exports = router;