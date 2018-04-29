const express = require('express');
const calendarRouter = express.Router();
const sql = require('mssql');
const { check, validationResult } = require('express-validator/check')
// pass in bookRoutes as argument for debug
const debug = require('debug')('app:calendarRoutes');

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

		calendarRouter.route('/')
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
			

				//const request = new sql.Request();
				// this returns a promise that sends back some desired result
				// but also includes error handling
				//const result = await request.query('SELECT * FROM course')

				res.render(
					'calendar', {
						nav,
				  		title: 'SiTE',
				  		// this is the sql table
				  		
				  	});
		});

		calendarRouter.route('/submit')
		.post((req, res, next) => {
			
			var errors = req.validationErrors();
			if (errors)
			{
				req.session.errors = errors;
			}

			var { id, cid, name, course, MS, TS, WS, THS, FS, ME, TE,WE, THE, FE,ML,TL,WL,THL,FL } = req.body;
			console.log(req.body.class);
			const request = new sql.Request();

			MS = req.body.MS;
			MS = MS.replace(":",".");
			MS = Number(MS);

			TS = req.body.TS.replace(":",".");
			TS = TS.replace(":",".");
			TS = Number(TS);

			WS = req.body.WS.replace(":",".");
			WS = WS.replace(":",".");
			WS = Number(WS);

			THS = req.body.THS.replace(":",".");
			THS = THS.replace(":",".");
			THS = Number(THS);

			FS = req.body.FS.replace(":",".");
			FS = FS.replace(":",".");
			FS = Number(FS);

			ME = req.body.ME.replace(":",".");
			ME = ME.replace(":",".");
			ME = Number(ME);

			TE = req.body.TE.replace(":",".");
			TE = TE.replace(":",".");
			TE = Number(TE);

			WE = req.body.WE.replace(":",".");
			WE = WE.replace(":",".");
			WE = Number(WE);

			THE = req.body.THE.replace(":",".");
			THE = THE.replace(":",".");
			THE = Number(THE);

			FE = req.body.FE.replace(":",".");
			FE = FE.replace(":",".");
			FE = Number(FE);

			(async function addUser(){
				//let client;
				try {
					const result = await request.query("UPDATE assistants SET MondayS = "+MS+", TuesdayS ="+TS+", WednesdayS = "+WS+", ThursdayS ="+THS+", FridayS = "+FS+", MondayE = "+ME+", TuesdayE = "+TE+", WednesdayE = "+WE+", ThursdayE = "+THE+", FridayE = "+FE+" WHERE id = "+req.body.id);
					debug('Connected correctly to server');
				
					
				} catch (err) {
					debug(err);
				}
				}());

				res.redirect('/dashboard');
			});
						
						
					

			
		


	
	// now that we've created bookRouter, return it.
	return calendarRouter;
}

// let the other files know about router
module.exports = router;