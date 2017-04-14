"use strict";
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
	if(err) return console.error('Unable to connect to Mongodb server');
	console.log('Successfully connected to Mongodb server');
	
	// supply a query to each of these methods, key/value pair to id the record(s) you wish to delete
	
	// deleteMany - returns obj with 'ok' and 'n' props
	
	// db.collection('Todos')
	// 	.deleteMany({text: 'complete the course'})
	// 	.then((result)=>{
	// 		console.log(`Success: ${result}`); // n === num docs deleted, ok === 1 it worked
	// 	}, (err)=>{
	// 		console.error('Unable to delete documents: ', err);
	// 	});
	
	// deleteOne - returns obj with 'ok' and 'n' props (deletes the first one found when more than one)
	
	// db.collection('Todos')
	// 	.deleteOne({text: 'complete the course'})
	// 	.then((result)=>{
	// 		console.log(`Success: ${result}`); // n === num docs deleted, ok === 1 it worked
	// 	}, (err)=>{
	// 		console.error('Unable to delete documents: ', err);
	// 	});
	
	// findOneAndDelete - returns the doc obj as a property of 'value', 'lastErrorObject' prop returns num of docs deleted, 1
	// db.collection('Todos')
	// 	.findOneAndDelete({completed: false}) // returns the doc
	// 	.then((result)=>{
	// 		console.log(JSON.stringify(result, undefined, 2));
	// 	}, (err)=>{
	// 		console.error('Unable to delete documents: ', err);
	// 	});
	
	// delte the first match
	db.collection('Users')
		.findOneAndDelete({_id: new ObjectID("58f08bdb876eae14940fcb86")})
		.then((result)=>{
			console.log(JSON.stringify(result, undefined, 2));
		}, (err)=>{
			console.error('Unable to delete documents: ', err);
		});
	
	// delete user(s) that match the query
	db.collection('Users')
		.deleteMany({name: 'Peter Jones'})
		.then((result)=>{
			console.log(`Success: ${result}`);
		}, (err)=>{
			console.error('Unable to delete documents: ', err);
		});
	
	db.close();
	
});
