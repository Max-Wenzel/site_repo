const express = require('express');
const sql = require('mssql');
const passport = require('passport');
// pass in bookRoutes as argument for debug
const debug = require('debug')('app:authRoutes');

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
						const results = await request.query("insert into login (type, username, password) values("+x+",'"+req.body.username+"','"+req.body.password+"');");
						debug('Connected correctly to server');
						const user = { username, password };
						debug(user)
						
					} catch (err) {
						debug(err);
					}
					

					// login and create user, fetched from signup submit button

					
					
				}());
				res.redirect('/dashboard');

			}
			//res.end();



				/*req.login(results.ops[0], () => {
					//request.query('INSERT INTO login')
					res.redirect('/auth/profile');
				});
			}());*/
			//debug(request.query());

			debug(req.body);

			//res.json(req.body);
		});
		
	authRouter.route('/signin')
		.get((req, res) => {
			res.render('signin', {
				nav,
				title: 'Sign In'
			});
		})
		.post((req, res,next) => {
			
			const { username, password } = req.body;
			const request = new sql.Request();

			(async function checkUser(){
				//let client;
				try {
					const result = await request.query("select id from login where username = '"+req.body.username+"' and password ='"+req.body.password+"'");
					//var id = await request.query("select id from login where username = '"+req.body.username+"'");
					debug('Connected correctly to server');
					const user = { username, password };
					debug(user)
					console.log(result);

					var dataString = result.recordset[0].id;
					var lit = Number(dataString);
		

					if(result.recordset.length > 0){
						res.redirect('/dashboard/'+lit);
						}
					else{
						res.redirect('/');
					}
					
				} catch (err) {
					debug(err);
				}
				
				
				

				// login and create user, fetched from signup submit button
				
				
			}());

			//res.end();


			debug(req.body);
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
	return authRouter
};

module.exports = router;