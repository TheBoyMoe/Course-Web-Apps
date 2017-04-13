/*
	References:
	[1] https://askubuntu.com/questions/739297/how-to-install-robomongo-ubuntu-system-please-let-me-know/781793
	[2] https://askubuntu.com/questions/56339/how-to-create-a-soft-or-symbolic-link
	[3] https://github.com/mongodb/node-mongodb-native
	[4] http://mongodb.github.io/node-mongodb-native/
	[5] http://mongodb.github.io/node-mongodb-native/2.2/
	[6] http://mongodb.github.io/node-mongodb-native/2.2/api/

 */
"use strict";
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
	if(err) return console.error('Unable to connect to Mongodb server');
	
	// Todo's collection - insert a document into the collection
	db.collection('Todos').insertOne({
		text: 'First todo added',
		completed: false
	}, (err, result)=>{
		if(err) return console.error('Unable to insert the record', err);
		
		console.log(JSON.stringify(result.ops, undefined, 2)); // ops contains the records inserted
	});
	
	console.log('Successfully connected to Mongodb server');
	db.close();
});
