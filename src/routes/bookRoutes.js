const express = require('express');
const bookRouter = express.Router();

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

	// allows us to set up a series of routes for bookRouter
	bookRouter.route('/')
		.get((req, res) => {
			res.render(
				'bookListView', {
					nav,
		  		title: 'SiTE',
		  		dashboard
		  	}
			);
		});

	bookRouter.route('/:id')
		.get((req, res) => {
			const id = req.params.id;
			res.render(
				'bookView', {
					nav,
		  		title: 'SiTE',
		  		book: dashboard[id]
		  	}
			);
		});
	return bookRouter;
}

module.exports = router;