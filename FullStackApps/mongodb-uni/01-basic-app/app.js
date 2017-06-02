'use strict';
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

MongoClient.connect('mongodb://localhost:27017/video', (err, db) => {
	assert.equal(null, err);
	console.log('Successfully connected to dbase');
	
	db.collection('movies').find({}).toArray((err, docs) => {
		docs.forEach((doc) => console.log(doc._id));
		db.close();
	});
	console.log('called find()');
});