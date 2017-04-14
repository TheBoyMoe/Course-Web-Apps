/*
	Mongoose configuration
 
	 References:
	 [1] http://mongoosejs.com/docs/guide.html
	 [2] http://mongoosejs.com/docs/validation.html (define validation on your schema/data model)
	 [3] https://httpstatuses.com/ (http status codes)
	 
	 - mongoose doesn't support promises out of the box, uses callbacks by default
	 - configure it to use global.Promise - built in Promise library
	 
	 - use mongoose to create your model, schema
	 - Mongodb has no data structure other than db consists of collections, collections contain documents
	 - Create the model using .model() - give it a name and pass in a settings obj which defines the docs property names and data types
	 - Mongoose automatically creates the database and collection (lowercase, and plural of the name passed in with the settings obj) when inserting 1st doc
	 - mongoose will coerce numbers/booleans into strings when passing bools/nums when a string is expected
	 
	 - to launch Postman, in chrome address bar type:
	 - chrome://apps
	
*/
'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
	mongoose
};