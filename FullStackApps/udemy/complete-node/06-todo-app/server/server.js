
/*
	References:
	[1] http://mongoosejs.com/docs/guide.html
	
 	 - mongoose doesn't support promises out of the box, uses callbacks by default
 	 	- configure it to use global.Promise - built in Promise library
 	 
 	 - use mongoose to create your model, schema
 	 	- Mongodb has no data structure other than db consists of collections, collections contain documents
 	 	- Create the model using .model() - give it a name and pass in a settings obj which defines the docs property names and data types
 	 	- Mongoose automatically creates the database and collection (lowercase, and plural of model name) when inserting 1st doc
 	 	
  */
'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// data model - props optional, since they've not been defined as req'd
const Todo = mongoose.model('Todo', {
	text: {
		type: String
	},
	completed: {
		type: Boolean
	},
	completedAt: {
		type: Number
	}
});

// to create a new object, call Todo as if it were a constructor function
// passing an object in which you specify property values, eg
let newTodo = new Todo({
	text: 'Going to the park with the dog',
	completed: false,
	completedAt: -1
});

// to save the obj, call save() - returns a promise - returns actual doc or error
newTodo.save().then((doc)=>{
	console.log('Success: ', doc);
}, (err)=>{
	console.error('Unable to save Todo: ', err);
});