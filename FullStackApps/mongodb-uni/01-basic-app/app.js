'use strict';
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use((req, res) => {
	res.sendStatus(404);
});

app.listen(3000, () => {
	console.log(`Express is listening on port ${port}`);
});


// MongoClient.connect('mongodb://localhost:27017/video', (err, db) => {
// 	assert.equal(null, err);
// 	console.log('Successfully connected to dbase');
//
// 	db.collection('movies').find({}).toArray((err, docs) => {
// 		docs.forEach((doc) => console.log(doc.title));
// 		db.close();
// 	});
// 	// due to asynchronous nature of node driver
// 	// console message prints before doc titles
// 	console.log('called find()');
// });

