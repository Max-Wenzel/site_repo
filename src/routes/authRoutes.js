const express = require('express');
const sql = require('mssql');
const passport = require('passport');
const bcrypt = require('bcrypt');
// pass in bookRoutes as argument for debug
const debug = require('debug')('app:authRoutes');
var passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const sessioncheck = require('../routes/sessionCheck');

const authRouter = express.Router();

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
	authRouter.route('/signUp')
		.post((req, res,next) => {
			req.check('username', 'Invalid Email ').isEmail();
			req.check('password', 'Password must be at least 8 characters').isLength({min: 8});
			req.check('password', 'Password fields must be equal').equals(req.body.confPassword);
			var errors = req.validationErrors();
			if(req.body.type == 'Student'){
				var x = 1;
			}
			else{
				var x = 2;
			}
			if(errors)
			{
				req.session.errors = errors;

				res.redirect('/');
			} 
			else
			{
				const request = new sql.Request();
				(async function addUser(){
					//let client;
					try {
						/*bcrypt.hash(req.body.password,10, (err, hash) => {
							if (err){
								return res.status(500).json({
									error: err
								});
							} else {
								const results = request.query("insert into login (type, username, password) values("+x+",'"+req.body.username+"','"+hash+"');");
							
							}

						});*/
						const check = await request.query("select * from login where username = '"+req.body.username+"'");
						if(check.recordset.length == 0){
							var hash = passwordHash.generate(req.body.password);
							const results = await request.query("insert into login (type, username, password) values("+x+",'"+req.body.username+"','"+hash+"');");
							var tuba = await request.query("select id from login where username = '"+req.body.username+"' and password ='"+hash+"'");
							var dataString = tuba.recordset[0].id;
							var	lit = '/dashboard/' + dataString;
							if (tuba.recordset[0].type == 2){
								lit = '/calendar';
							}

							if(tuba.recordset.length > 0){
								res.redirect('/signin');
								}
							else{
								res.redirect('/');
							}
						}
						else{
							errors = [{msg: "Account Already Exists"}];
							req.session.errors = errors;

							res.redirect('/');
						}



						debug('Connected correctly to server');

					} catch (err) {
						debug(err);
					}
					

					// login and create user, fetched from signup submit button

			
						
					
				}());

				//res.redirect('/');

			}
			//res.end();



				/*req.login(results.ops[0], () => {
					//request.query('INSERT INTO login')
					res.redirect('/auth/profile');
				});
			}());*/
			//debug(request.query());

			//debug(req.body);

			//res.json(req.body);
		});
		
	authRouter.route('/signin')
		.post((req, res,next) => {
			
			const request = new sql.Request();

			(async function checkUser(){
				//let client;
				try {

					const result = await request.query("select * from login where username = '"+req.body.username+"';");
					//var id = await request.query("select id from login where username = '"+req.body.username+"'");
					debug('Connected correctly to server');
					//const user = { username, password };
					//debug(result);
					//var dataString = result.recordset[0].id;
					//var lit = Number(dataString);

					if(result.recordset.length < 1){
						req.session.found = 'Login Failed';
						res.redirect('back');
						}
					else{
						//bcrypt.compare(req.body.password, result.recordset[0].password)
						const login = passwordHash.verify(req.body.password, result.recordset[0].password);
						//debug(login);
						var address = '/dashboard/'+result.recordset[0].id;
						if (result.recordset[0].type == 2)
						{
							address = '/calendar'
						}
						if (login){
							const t = jwt.sign({
								email: req.body.username,
								uid: result.recordset[0].id,
								type: result.recordset[0].type

							}, "superSecret",{
								expiresIn: "1h"
							},

							);
							req.session.token = t;
							res.redirect(address);
						} else{
							req.session.found = 'Login Failed';
							res.redirect('back');
						}
					}

					
				} catch (err) {
					debug(err);
				}
				
				
				

				// login and create user, fetched from signup submit button
				
				
			}());

			//res.end();


			//debug(req.body);
			//res.redirect('/dashboard');
			//res.json(req.body);
			
		});
		/*
		.post(passport.authenticate('local', {
			successRedirect: '/auth/profile',
			failureRedirect: '/'
		}));*/
	// since the user is logged in, passport will attach the user to a request
	authRouter.route('/profile')
		// user authorization
		.all((req, res, next) => {
			if(req.user){
				next();
			} else {
				res.redirect('/');
			}
		})
		.get((req, res) => {
			res.json(req,user);
		});
	return authRouter;
}

module.exports = router;