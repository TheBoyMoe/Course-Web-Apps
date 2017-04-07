/* Mongoose demo */
'use strict';
const mongoose = require('mongoose');

// connect to the sandbox db
mongoose.connect('mongodb://localhost:27017/sandbox');

// monitor the connection - emits events related to the database we can listen for and handle
const db = mongoose.connection;
db.on('error', (err)=>{
	console.error('connection error', err.message);
});

// listen for the open event - connection open and ready
// listen using once() - invoked the first time the event occurs, on() fires every time.
db.once('open', ()=>{
	console.log('db connection successful');
	
	// TODO all dbase communication goes here
	
	
	// create the schema
	const Schema = mongoose.Schema;
	const AnimalSchema = new Schema({
		type: String,
		size: String,
		color: String,
		mass: Number,
		name: String
	});
	
	// create the model (Mongoose object), giving it a name and using the defined schema
	const Animal = mongoose.model('Animal', AnimalSchema);
	
	// create a document - instance
	const elephant = new Animal({
		type: 'elephant',
		size: 'big',
		color: 'gray',
		mass: 6000,
		name: 'Lawrence'
	});
	
	// save the schema and document
	// save is an asynchronous method, you need to call close() from a callback
	// otherwise it will be called before save has finished
	elephant.save((err)=>{
		if(err) console.error('Save failed', err.message);
		else console.log('Save successful!');
		db.close(()=>{
			console.log('connection closed');
		});
	});
	
});