'use strict';
const mongoose = require('mongoose');

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

module.exports = {
	Todo
};

// to create a new object, call Todo as if it were a constructor function
// passing an object in which you specify property values, eg

// let newTodo = new Todo({
// 	text: 'Going to the park to annoy the dog'
// });
//
// // to save the obj, call save() - returns a promise - returns actual doc or error
// newTodo.save().then((doc)=>{
// 	console.log('Success: ', doc);
// }, (err)=>{
// 	console.error('Unable to save Todo: ', err);
// });