'use strict';
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const consolidate = require('consolidate');

// app config
const app = express();
const port = process.env.PORT || 3000;
app.engine('html', consolidate.nunjucks);
app.set('view engine', 'html'); // register nunjucks as the template engine
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
	res.render('index', {'name': 'Templates'});
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

