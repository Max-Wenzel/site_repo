const express = require('express');
const addcourseRouter = express.Router();
const sql = require('mssql');
const { check, validationResult } = require('express-validator/check')
// pass in bookRoutes as argument for debug
const sessioncheck = require('../routes/sessionCheck');

const debug = require('debug')('app:addcourseRoutes');

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

		addcourseRouter.route('/')
		.get(sessioncheck,(req, res, next) => {
			if (req.userdata.type == 1)
			{
				next();
			}
			else
			{
				res.status(401).send('Auth Failed');
			}
		}, (req, res) => {
/*
	Inside a function marked as async, you are allowed to place the await keyword
	in front of an expression that returns a promise. When you do, the execution of
	the async function is paused until the promise is resolved.
	Asynchronous Definition: of two or more events not existing or happening at
	the same time.
*/
			// Immediately Invoked Function Expression (IIFE)
			// There is a lot going on right here. Look up the concepts!
			

				//const request = new sql.Request();
				// this returns a promise that sends back some desired result
				// but also includes error handling
				//const result = await request.query('SELECT * FROM course')

				res.render(
					'addcourse', {
						nav,
				  		title: 'SiTE',
				  		id: req.userdata.uid
				  		// this is the sql table
				  		
				  	});
		});

		addcourseRouter.route('/submit')
		.post(sessioncheck,(req, res, next) => {
			
			var errors = req.validationErrors();
			if (errors)
			{
				req.session.errors = errors;
			}

			const {cid, cname, prof } = req.body;
			console.log(req.body.class);
			const request = new sql.Request();
			(async function addUser(){
				//let client;
				try {
					const result = await request.query("set identity_insert course on; insert into course (cid,id,name,professor) values("+req.userdata.uid+","+req.body.cid+",'"+req.body.cname+"','"+req.body.prof+"');");
					//const results = await request.query("insert into assistants (id,cid,full_name,class,MondayS,TuesdayS,WednesdayS,ThursdayS,FridayS,MondayE,TuesdayE,WednesdayE,ThursdayE,FridayE,Mlocation,Tlocation,Wlocation,THlocation,Flocation) values("+req.body.id+","+req.body.cid+",'"+req.body.full_name+"','"+req.body.classs+"',"+req.body.MondayS+","+req.body.TuesdayS+","+req.body.WednesdayS+","+req.body.ThursdayS+","+req.body.FridayS+","+req.body.MondayE+","+req.body.TuesdayE+","+req.body.WednesdayE+","+req.body.ThursdayE+","+req.body.FridayE+",'"+req.body.MondayL+"','"+req.body.TuesdayL+"','"+req.body.WednesdayL+"','"+req.body.ThursdayL+"','"+req.body.FridayL+"')");
					debug('Connected correctly to server');
				
					
				} catch (err) {
					debug(err);
				}
				}());

				res.redirect('back');
			});
						
						
					

			
		


	
	// now that we've created bookRouter, return it.
	return addcourseRouter;
}

// let the other files know about router
module.exports = router;