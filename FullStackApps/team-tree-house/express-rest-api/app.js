/*
	middleware - process client requests before handing them off to the routes
	 - : tells express what follows is a parameter
	 - use the query property on the req obj to access query parameters (req.params obj)
	 - you can pass data from one middleware function to another by assigning it as a property to the req obj
	 - use body-parser module to parse req body into json
	 - use Morgan logger to log http status codes as well as our routes
	 - you need a next() call whenever a handler does not send a response to the user, otherwise the app appears to 'freeze up'
	 - you want to use a custom error handler to ensure json errors are sent to the client when they occur
	 - you can set multiple handlers on a single route by passing multiple callbacks into the route
	
	Mongoose
	 - Mongo uses collections of documents to store data, but it's not fussy about
		- what it accepts
		- or it's structure - it does not know how to relate two pieces of data together
	 - Mongoose is a Mongo module which creates that structure and the relationship between the different pieces of data
	 - A Mongoose schema is a json representation of what a document will contain
	 	- the properties and their respective data types (String , Number, Date, Boolean, Arrays and Javascript Objects)
	
	
	References:
	
	[1] https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
	[2] https://en.wikipedia.org/wiki/List_of_HTTP_header_fields
	[3] https://developers.google.com/google-apps/calendar/v3/reference/#Events (api example)
	[4] https://developers.google.com/google-apps/calendar/v3/reference/events#resource-representations (example of resource representation)
	[5] https://www.getpostman.com/docs/introduction
	[6] http://expressjs.com/en/4x/api.html#router
	[7] https://www.npmjs.com/package/morgan
	[8] https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
	[9] http://mongoosejs.com/docs/index.html
	[10] http://mongoosejs.com/docs/middleware.html
	[11] http://mongoosejs.com/docs/guide.html
	
	
 */
'use strict';

const express = require('express');
const jsonParser = require('body-parser').json;
const routes = require('./routes.js');
const logger = require('morgan');
const app = express();

// configures express to golor code the http status codes
app.use(logger('dev'));

// parse the requests body as json and make it accessible from the req obj's body property
app.use(jsonParser());

// any requests that arrive with '/questions' will be directed to the routes module
app.use('/questions', routes);

// catch any 404 errors(verb and resource don't match any defined routes) and forward to an error handler
// calling next() with a param tells express there has been an error
// unless you provide a custom error handler, the default one will be called
app.use((req, res, next)=>{
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler - must have 4 params, tells express that it's an error handler and not middleware
app.use((err, req, res, next)=>{
	// err status would be undefined if the error were internally generated bt the server
	res.status(err.status || 500);
	// send the error tot the client as json
	res.json({
		error: {
			message: err.message
		}
	})
});

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
	console.log(`Express is listening on port ${port}`);
});