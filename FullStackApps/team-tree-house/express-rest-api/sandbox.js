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
	
	//  all dbase communication goes here
	
	// create the schema
	const Schema = mongoose.Schema;
	const AnimalSchema = new Schema({
		type: {type: String, default: 'goldfish'},
		size: {type: String, default: 'small'},
		color: {type: String, default: 'orange'},
		mass: {type: Number, default: 0.007},
		name: {type: String, default: 'Angela'}
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
	
	// elephant.save((err)=>{
	// 	if(err) console.error('Save failed', err.message);
	// 	else console.log('Save successful!');
	// 	db.close(()=>{
	// 		console.log('connection closed');
	// 	});
	// });
	
	// now saving elephant and animal, call animal.save() from within the elephant.save()
	// callback and close the connection from within the animal.save() callback to ensure proper sequence of events
	// empty the Animals collection first since the elephant already exists
	const animal = new Animal({}); // generic animal
	Animal.remove({}, ()=>{
		// empty the current collection 1st (use a query to remove specific docs)
		// before executing the save
		elephant.save((err)=>{
			if(err) console.error('Saving elephant failed', err.message);
			animal.save((err)=>{
				if(err) console.error('Saving animal failed', err.message);
				db.close(()=>{
					console.log('connection closed');
				});
			});
		});
	});
	
	
});