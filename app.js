// included packages
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

// stuff outside of requires
const app = express();
// attempt PORT, if failed then use port 3000
const port = process.env.PORT || 3000;

const config = {
  user: 'library',
  password: 'Safe1853920!',
  server: 'pslibrarym.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
  database: 'PSLibrary',

  options: {
    encrypt: true // Use this if you're on Windows Azure
  }
};

sql.connect(config).catch(err => debug(err));

// tiny gives less information for logs
app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
	{link: '/books', title: 'Book'},
	{link: '/authors', title: 'Author'}
];

const bookRouter = require('./src/routes/bookRoutes')(nav);

app.use('/books', bookRouter);
// in express, everything works through app
app.get('/', (req, res) => {
  // __dirname is the location of the current executable
  res.render(
  	'index', { 
  		nav: [
  			{link: '/books', title: 'Books'},
  			{link: '/authors', title: 'Authors'}
  		], 
  		title: 'Library'
  	}
  );
});

app.listen(port, () => {
  // ${} is a form of string templates
  debug(`listening on port ${chalk.green(port)}`);
});
