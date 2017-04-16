'use strict';
const mongoose = require('mongoose');

// data model - props not been defined as req'd are optional
const Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,
		minlength: 2,
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
