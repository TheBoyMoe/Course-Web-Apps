"use strict";
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
	if(err) return console.error('Unable to connect to Mongodb server');
	console.log('Successfully connected to Mongodb server');
	
	// fetch all the docs in a collection
	//  - find() returns a cursor, toArray() - returns an array of object records through a promise
	// mongo methods that return a cursor can be processed via a callback or promise
	
	// db.collection('Todos').find().toArray()
	// 	.then((docs)=>{
	// 		console.log('Records: ', JSON.stringify(docs, undefined, 2));
	// 	}, (err)=>{
	// 		console.error('Failed to retrieve records', err);
	// 	});
	
	// fetch only todos with a particular value field, e.g completed === false
	// to query for the objectID, create an objectID from the id string value
	
	// db.collection('Todos').find({
	// 		_id: new ObjectID("58effdb3c3db98405867d17c")
	// 	}).toArray()
	// 	.then((docs)=>{
	// 		console.log('Records: ', JSON.stringify(docs, undefined, 2));
	// 	}, (err)=>{
	// 		console.error('Failed to retrieve records', err);
	// 	});
	
	// fetch the number of docs in the collection
	// db.collection('Todos').find().count()
	// 	.then((count)=>{
	// 		console.log(`Todos count ${count}`);
	// 	}, (err)=>{
	// 		console.error('Failed to retrieve records', err);
	// 	});
	
	db.collection('Users').find({age: 54}).toArray()
		.then((docs)=>{
			console.log('Records: ', JSON.stringify(docs, undefined, 2));
		}, (err)=>{
			console.error('Failed to retrieve records', err);
		});
	
	db.close();
});
