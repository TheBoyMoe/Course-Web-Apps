/*
	References:
	[1] https://askubuntu.com/questions/739297/how-to-install-robomongo-ubuntu-system-please-let-me-know/781793
	[2] https://askubuntu.com/questions/56339/how-to-create-a-soft-or-symbolic-link
	[3] https://github.com/mongodb/node-mongodb-native
	[4] http://mongodb.github.io/node-mongodb-native/
	[5] http://mongodb.github.io/node-mongodb-native/2.2/
	[6] http://mongodb.github.io/node-mongodb-native/2.2/api/

	Note:
	- to launch Robomongo gui
		$ /usr/local/bin/robomongo
 */
"use strict";
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // using ES6 destructuring

// you can generate object ids
console.log(new ObjectID);


// use the url to the dbase
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
	if(err) return console.error('Unable to connect to Mongodb server');
	console.log('Successfully connected to Mongodb server');
	
	// Todo's collection - insert a document into the collection
	
	// db.collection('Todos').insertOne({ // inserting the first record creates the db
	// 	text: 'First todo added',
	// 	completed: false
	// }, (err, result)=>{
	// 	if(err) return console.error('Unable to insert the record', err);
	//
	// 	// ops contains array of one or more records inserted
	// 	console.log(JSON.stringify(result.ops, undefined, 2));
	// });
	
	// User's collection - insert  a new user into the collection (name, age, location)
	// each object is given a unique 12byte id => _id
	//  - made up of a time stamp (no need for a date created field),
	//  - unique machine identifier
	//  - process id & counter
	// you can 'extract' the timestamp using the getTimestamp() method
	
	// db.collection('Users').insertOne({
	// 	// _id: 879678687687, // you can specify your own id
	// 	name: 'John Paul Jones',
	// 	age: 63,
	// 	location: 'Los Angeles, Ca'
	// }, (err, result)=>{
	// 	if(err) return console.error('Unable to insert record');
	//
	// 	console.log('Insert successful: ', JSON.stringify(result.ops, undefined, 2));
	// 	console.log('Timestamp: ', result.ops[0]._id.getTimestamp());
	// });
	
	
	db.close();
});
