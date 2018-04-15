const express = require('express');
const bookRouter = express.Router();
const sql = require('mssql');
// pass in bookRoutes as argument for debug
const debug = require('debug')('app:bookRoutes');

function router(nav) {
	// hard coded book database to be replaced by MySQL.
	// use const for variables that do not change.
	// this needs to be changed so that we are getting CA/TA info from SQL
	const dashboard=[
		{
			title: 'War and Peace',
			genre: 'Historical Fiction',
			author: 'Lev Nikolayevich Tolstoy'
		},
		{
			title: 'Les Miserables',
			genre: 'Historical Fiction',
			author: 'Victor Hugo'
		},
		{
			title: 'Childhood',
			genre: 'Biography',
			author: 'Lev Nikolayevich Tolstoy'
		}
	];

	// routing to view the homepage
	bookRouter.route('/')
		.get((req, res) => {
			const request = new sql.Request();

			// this returns a promise that sends back some desired result
			// but also includes error handling
			request.query('SELECT * FROM assistants')
				.then((result) => {
					debug(result);
					res.render(
						'dashboard', {
							nav,
					  		title: 'SiTE',
					  		// this is the sql table
					  		dashboard: result.recordset
					  	}
					);
				});
		});

	// routing to view a single assistant
	bookRouter.route('/:id')
		.get((req, res) => {
			const id = req.params.id;
			res.render(
				'assistant', {
					nav,
			  		title: 'SiTE',
			  		book: dashboard[id]
		  		}
			);
		});
	// now that we've created bookRouter, return it.
	return bookRouter;
}

// let the other files know about router
module.exports = router;