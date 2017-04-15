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

const id = '58f0fe2dc99fd8321f9c10e311';

// remove all docs from the database

// Todo.remove({}).then((res)=>{
// 	console.log(res.result); // returns num docs removed
// }).catch((e) => console.error(e));

// methods for removing individual docs (and return it)
// Collection_name.findOneAndRemove({}); // takes query object, query by any prop, first match is removed
// Collection_name.findByIdAndRemove(id);

// Todo.findByIdAndRemove('58f22b37a71a1c29b7665eb1').then((doc)=>{
// 	if(!doc) return console.log('Unable to find todo');
// 	console.log(JSON.stringify(doc, undefined, 2));
// }).catch((e) => console.error(e.message));

Todo.findOneAndRemove({text: "one more for the road jack"}).then((doc)=>{
	if(!doc) return console.log('Unable to find todo');
	console.log(JSON.stringify(doc, undefined, 2));
}).catch((e) => console.error(e));

