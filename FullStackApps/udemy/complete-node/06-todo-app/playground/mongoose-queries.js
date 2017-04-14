/*
	References:
	[1] http://mongoosejs.com/docs/queries.html
	
	Note:
	- the methods shown below do not throw an error if no match is found for the supplied id
	- either an emoty array is returned, .find(), or null
 */
'use strict';
const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

const id = '58f14a74bc877c52cda8e49b';

Todo.find().then((todos)=>{
	if(todos.length === 0) return console.error('No match found');
	console.log('Todos', todos); // mongoose returns an array
});

Todo.find({
	_id: id // mongoose will automatically convert this to an _id object
}).then((todos)=>{
	if(todos.length === 0) return console.error('No match found');
	console.log('Todos', todos); // mongoose returns an array
});

Todo.findOne({
	_id: id
}).then((todo)=>{
	if(!todo) return console.error('No match found');
	console.log('Todo', todo); // returns actual doc
});

Todo.findById(id).then((todo)=>{
	if(!todo) return console.error('No match found');
	console.log('Todo find by id', todo); // returns the doc
});
