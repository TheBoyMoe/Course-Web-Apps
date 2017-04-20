/*
	References:
	[1] https://pugjs.org/api/getting-started.html (pug)
	[2] http://expressjs.com/en/starter/basic-routing.html
	[3] https://nodemon.io/
	[4] http://mongoosejs.com/docs/index.html
	[5] http://mongoosejs.com/docs/guide.html
	[6] https://docs.mongodb.com/getting-started/shell/client/
	[7] http://bcrypt.sourceforge.net/
	[8] https://www.npmjs.com/package/bcrypt
	[9] https://github.com/expressjs/session (session module created by the express team)
	[10] https://github.com/expressjs/session#compatible-session-stores
	[11] https://docs.stormpath.com/nodejs/express/latest/introduction.html (user account management)
	[12] http://passportjs.org/ (authentication for node)
	[13] http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/ (password reset in node)
	[14] https://expressjs.com/en/guide/using-middleware.html (guide to using middleware in express)
	[15] https://httpstatuses.com/ (http status codes)
	
	Note:
	Mongo shell commands
	 - show dbs — display the databases
	 - use [database_name] — specify the database you're going to work with
	 - show collections — shows the document collections for the selected database
	 - db.users.find() — display all the documents in the users collection
	 - db.users.find().pretty() — nicer format for output documents within the shell
	 - db.users.drop() — remove the users collection from the current database
 
	Hashing — using a function which takes some piece of information and return a hash that represents that information
	Salt — randomly generated string that is concatenated with a password
	BCrypt - a hashing algorithm that converts a password to a fixed length, string of characters.
	
	Hashing lets you store a password in a database so that, even if the database is accessed,
	hackers won't be able to figure out the real password and log into your site
 
	Session — Information pertaining to a specific user of a website - stored on server (may contain sensitive data)
	Use sessions to track logged in users
	 - also track anon users (what pages visited, how long they stay) - Google Analytics uses sessions
	 - by default session store is saved to RAM, in production you want to use a dbase
	 - sessions provide a way of tracking visitors to your site
	 
	Cookie — File managed by the web browser that can save information from a website - holds session ID
	 -  the session ID -- a key to associate that one user and browser with a specific collection of session data.
	 - cookies can be created both in the clients browser (using javascript) and server (by the headers sent to the browser)
	 - a server can create, modify, delete and read cookies
	 
	Middleware - software that runs after a request is received, but before a response is sent back
	 - body parser - takes the request body, makes it readable by the app, before handing it off to the next part of the app
	 - express session module - track session of logged in users
	 - you chain together multiple middleware functions that run one after the other
	 - a typical middleware function receives 3 args: req, res and next. Next is a function and it represents the
	 	next piece of middleware in the request/response cycle, calling next() tells express to move on to the next piece of middleware.
	 - to add middleware to your app, call use() method on the app object
	 
 */

'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

// mongoose and db setup
mongoose.connect('mongodb://localhost:27017/bookworm');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

// config session for tracking logins - users who haven't logged in will not have a session ID
app.use(session({
	secret: 'mongo express app', // req'd, used to sign the session id cookie - extra layer of security
	resave: true, // optional, ensures the session is saved in the session store
	saveUninitialized: false // optional, save an uninitialized session in the session store
}));

// make the users session ID available to the whole app (including templates)
app.use((req, res, next)=>{
	// grab the session id from the req obj
	// - locals obj gives you a way of adding values to the res obj
	// - in express all views have access to the res obj
	// - if the user is not logged in currentUser will be undefined
	res.locals.currentUser = req.session.userId;
	next();
});


// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// include routes
let routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// listen on port 3000
app.listen(3000, function () {
  console.log('Express app listening on port 3000');
});