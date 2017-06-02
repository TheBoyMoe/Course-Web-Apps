'use strict';
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const consolidate = require('consolidate');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

// app config
const app = express();
const port = process.env.PORT || 3000;
app.engine('html', consolidate.nunjucks);
app.set('view engine', 'html'); // register nunjucks as the template engine
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));


// setup mongo client and the routes in the context of that connections db object
MongoClient.connect('mongodb://localhost:27017/video', (err, db) => {
	assert.equal(null, err);
	console.log('Successfully connected to dbase');
	
	// GET /
	app.get('/', (req, res) => {
		db.collection('movies').find({}).toArray((err, docs) => {
			res.render('index', {'movies': docs});
		});
	});
	
	
	// POST /favourite_movie
	app.post('/favourite_movie', (req, res, next) => {
		let movie = req.body;
		if(movie.title === '' || movie.year === '' || movie.imdb === '')
			return next(new Error('You need to fill in all fields'));
		
		try {
			// insert the movie into mongo
			db.collection('movies').insertOne({
				"title": movie.title,
				"year": movie.year,
				"imdb": movie.imdb
			});
		} catch (e){
			let err = new Error('Error inserting record');
			return next(err);
		}
		
		// if successful query dbase and display the results
		res.redirect('/');
		
	});
	
	
	app.use((req, res, next) => {
		let error = new Error('Page not found');
		error.status = 404;
		next(error);
	});
	
	app.use(errorHandler);
	
	app.listen(3000, () => {
		console.log(`Express is listening on port ${port}`);
	});
	
});



// Handler for internal server errors
function errorHandler(err, req, res, next) {
	console.error(err.message);
	//console.error(err.stack);
	res.status(err.status || 500).render('error', { error: err });
}

