const express = require('express');
const bookRouter = express.Router();
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes');

function router(nav) {
	// allows us to set up a series of routes for bookRouter
	bookRouter.route('/')
		.get((req, res) => {
			(async function query(){
				const request = new sql.Request();
				const { recordset } = await request.query('select * from books');
				res.render(
					'bookListView', {
						nav,
			  		title: 'Library',
			  		books: recordset
			  	}
				);
			}());
		});

	bookRouter.route('/:id')
		.all((req, res, next) => {
			(async function query(){
				const { id } = req.params;
				const request = new sql.Request();
				const { recordset } = 
					await request.input('id', sql.Int, id)
						.query('select * from books where id = @id');
				req.book = recordset[0];
				next();
			}());
		})
		.get((req, res) => {
			res.render(
				'bookView', {
					nav,
		  		title: 'Library',
		  		book: req.book
		  	}
			);
		});
	return bookRouter;
}

	module.exports = router;