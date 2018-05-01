// included packages
const express = require('express');
var router = express.Router();
var phpExpress = require('php-express')({
    binPath: 'php'
});
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');
const session = require('express-session');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const sessioncheck = require('./src/routes/sessionCheck');

// stuff outside of requires
const app = express();
// attempt PORT, if failed then use port 3000
// for some reason process.env.PORT is causing a javascript throw error. If using a VM then just use:
// const port = 3000;
// otherwise this should work...
const port = process.env.PORT || 3000;

// configuration for mssql
const config = {
    user: 'site',
    password: 'Software1853920!',
    server: 'sdassistants.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'SDAssistants',

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};

// use config to open up connection, returns a promise
// catch deals with error handling
// .catch(err => debug(err)) for some reason always throws an error???
sql.connect(config);


app.use('/', express.static(__dirname));

app.set('views', path.join(__dirname, '/views'));


// tiny gives less information for logs
app.use(morgan('tiny'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// __dirname is the location of the current executable
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use(expressValidator());
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

// secret is used to build the cookie

app.use(session({secret: 'site',
                saveUninitialized: true,
                resave: false}));

// passport used for user authentication
require('./src/config/passport.js')(app);

// define objects for navigation bar and routing
const nav = [
  {link: '/dashboard', title: 'Dashboard'},
  {link: '/calendar', title: 'EDIT HOURS'},
  {link: '/courses', title: 'My Courses'},
  {link: '/addcourse', title: 'Add Course'}

];

// a router encapsulates all routes in one spot.
// this passes the nav object into the require function for routing
const bookRouter = require('./src/routes/bookRoutes')(nav);
const courseRouter = require('./src/routes/courseRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);
const calendarRouter = require('./src/routes/calendarRoutes')(nav);
const addcourseRouter = require('./src/routes/addcourseRoutes')(nav);
const signinRouter = require('./src/routes/signinRoutes')(nav);



// let the app know we are using bookRouter (similar to a require)
app.use('/dashboard', bookRouter);
app.use('/courses', courseRouter);
app.use('/auth', authRouter);
app.use('/calendar', calendarRouter);
app.use('/addcourse', addcourseRouter);
app.use('/signin', signinRouter);




// (req, res) => is equivalent to function(req,res)
app.get('/', (req, res) => {
  debug(req.body.token);
  res.render(
  	'index', {
      // objects to be fetched for in index.ejs for nav bar
  		nav: [
  			{link: '/dashboard', title: 'Dashboard'},
  			{link: '/calendar', title: 'EDIT HOURS'},
        {link: '/courses', title: 'My Courses'},
        {link: '/addcourse', title: 'Add Course'}
  		],
  		title: 'SiTE',
      errors: req.session.errors
  	});
  req.session.errors = null;
  //debug(req.session.errors);
});

app.listen(port, () => {
  // ${} is a form of string templates
  debug(`listening on port ${chalk.green(port)}`);
});

exports.closeServer = function(){
  server.close();
};
