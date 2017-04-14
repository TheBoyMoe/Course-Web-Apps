
/*
	References:
	[1] http://mongoosejs.com/docs/guide.html
	[2] http://mongoosejs.com/docs/validation.html (define validation on your schema/data model)
	
 	 - mongoose doesn't support promises out of the box, uses callbacks by default
 	 	- configure it to use global.Promise - built in Promise library
 	 
 	 - use mongoose to create your model, schema
 	 	- Mongodb has no data structure other than db consists of collections, collections contain documents
 	 	- Create the model using .model() - give it a name and pass in a settings obj which defines the docs property names and data types
 	 	- Mongoose automatically creates the database and collection (lowercase, and plural of model name) when inserting 1st doc
 	 	- mongoose will coerce numbers/booleans into strings when passing bools/nums when a string is expected
 	 	
  */
'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// data model - props not been defined as req'd are optional
const Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,
		minlength: 6,
		trim: true // remove leading/trailing spaces
	},
	completed: {
		type: Boolean,
		default: false // don't set re'd on props with default
	},
	completedAt: {
		type: Number,
		default: null
	}
});

// to create a new object, call Todo as if it were a constructor function
// passing an object in which you specify property values, eg
let newTodo = new Todo({
	text: 'Going to the park to annoy the dog'
});

// to save the obj, call save() - returns a promise - returns actual doc or error
newTodo.save().then((doc)=>{
	console.log('Success: ', doc);
}, (err)=>{
	console.error('Unable to save Todo: ', err);
});