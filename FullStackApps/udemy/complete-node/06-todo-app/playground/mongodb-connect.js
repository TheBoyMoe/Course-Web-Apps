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
const MongoClient = require('mongodb').MongoClient;

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
	db.collection('Users').insertOne({
		name: 'Grace Jones',
		age: 58,
		location: 'Paris, Tx'
	}, (err, result)=>{
		if(err) return console.error('Unable to insert record');
		
		console.log('Insert successful: ', JSON.stringify(result.ops, undefined, 2));
	});
	
	
	db.close();
});
