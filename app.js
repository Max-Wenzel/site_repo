// included packages
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

// stuff outside of requires
const app = express();
// attempt PORT, if failed then use port 3000
const port = process.env.PORT || 3000;

// tiny gives less information for logs
app.use(morgan('tiny'));
// __dirname is the location of the current executable
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

// define objects for navigation bar and routing
const nav = [
  {link: '/dashboard', title: 'Dashboard'},
  {link: '/calendar', title: 'Calendar'},
  {link: '/courses', title: 'My Courses'}
];

// a router encapsulates all routes in one spot.
const bookRouter = require('./src/routes/bookRoutes')(nav);

// let the app know we are using bookRouter (similar to a require)
app.use('/dashboard', bookRouter);

// (req, res) => is equivalent to function(req,res)
app.get('/', (req, res) => {
  res.render(
  	'index', { 
      // objects to be fetched for in index.ejs for nav bar
  		nav: [
  			{link: '/dashboard', title: 'Dashboard'},
  			{link: '/calendar', title: 'Calendar'},
        {link: '/courses', title: 'My Courses'}
  		], 
  		title: 'SiTE'
  	}
  );
});

app.listen(port, () => {
  // ${} is a form of string templates
  debug(`listening on port ${chalk.green(port)}`);
});
