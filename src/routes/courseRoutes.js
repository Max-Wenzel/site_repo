const express = require('express');
const courseRouter = express.Router();
const sql = require('mssql');
// pass in bookRoutes as argument for debug
const debug = require('debug')('app:courseRoutes');

function router(nav) {

	

		courseRouter.route('/')
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
				const result = await request.query('SELECT * FROM course')

				res.render(
					'courses', {
						nav,
				  		title: 'SiTE',
				  		// this is the sql table
				  		courses: result.recordset
				  	}
				);
			}());
		});

		courseRouter.route('/:id')
		.get((req, res) => {
			(async function query(){
				
				const id = req.params.id;
				const request = new sql.Request();
				const result = 
					await request.input('id', sql.Int, id)
						.query('SELECT * FROM course WHERE id = @id');
				res.render(
					'course', {
						nav,
				  		title: 'SiTE',
				  		courses: result.recordset[0]
			  		}
				);
			}());
		});

	
	// now that we've created bookRouter, return it.
	return courseRouter;
}

// let the other files know about router
module.exports = router;