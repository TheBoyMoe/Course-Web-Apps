/*
	References:
	[1] http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#findOneAndDelete
	[2] https://docs.mongodb.com/manual/reference/operator/update/ (update operators)
	[3] https://docs.mongodb.com/manual/reference/operator/update/set/
	[4] https://docs.mongodb.com/manual/reference/operator/update/inc/
 */
"use strict";
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
	if(err) return console.error('Unable to connect to Mongodb server');
	console.log('Successfully connected to Mongodb server');
	
	// update a doc and return it
	/*
		findOneAndUpdate(
			filter, // key/value pair used to find the appropriate doc
			update, // the props(and values) you want to update, requires use of mongo update operators, e.g $set
			options, // optional settings e.g sort, projection (limit the docs operated on), returnOriginal (default true, set to false to return updated doc)
			callback // result cursor passed back to - a promise is returned if no callback is passed in
		)
	 */
	// db.collection('Users')
	// 	.findOneAndUpdate({
	// 		_id: new ObjectID("58f0cc68de94913fab141748")
	// 	}, {
	// 		$set: {
	// 			age: 68
	// 		}
	// 	}, {
	// 		returnOriginal: false
	// 	})
	// 	.then((res)=>{
	// 		console.log(res);
	// 	}, (err)=>{
	// 		console.error(err);
	// 	});
	
	
	db.collection('Users')
		.findOneAndUpdate({
			_id: new ObjectID("58f0cc7ede94913fab141752")
		}, {
			$set: {
				name: 'John Paul, Jones'
			},
			$inc: {
				age: 20
			}
		}, {
			returnOriginal: false
		})
		.then((res)=>{
			console.log(res);
		}, (err)=>{
			console.error(err);
		});
	
	db.close();
	
});
