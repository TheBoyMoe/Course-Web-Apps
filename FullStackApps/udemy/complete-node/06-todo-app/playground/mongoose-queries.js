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
const {User} = require('./../server/models/user');

// const id = '58f14a74bc877c52cda8e49b11';
//
// if(!ObjectID.isValid(id)) console.log('ID not valid');
//
// Todo.find().then((todos)=>{
// 	if(todos.length === 0) return console.error('No match found');
// 	console.log('Todos', todos); // mongoose returns an array
// }).catch((e) => console.log(e)); // deal with any errors thrown
//
// Todo.find({
// 	_id: id // mongoose will automatically convert this to an _id object
// }).then((todos)=>{
// 	if(todos.length === 0) return console.error('No match found');
// 	console.log('Todos', todos); // mongoose returns an array
// }).catch((e) => console.log(e));
//
// Todo.findOne({
// 	_id: id
// }).then((todo)=>{
// 	if(!todo) return console.error('No match found');
// 	console.log('Todo', todo); // returns actual doc
// }).catch((e) => console.log(e));
//
// Todo.findById(id).then((todo)=>{
// 	if(!todo) return console.error('No match found');
// 	console.log('Todo find by id', todo); // returns the doc
// }).catch((e) => console.log(e));

const id = '58f0fe2dc99fd8321f9c10e311';

User.findById(id).then((user)=>{
	if(!user) return console.error('No match found');
	console.log(user); // query valid
}).catch((e) => console.error(e));