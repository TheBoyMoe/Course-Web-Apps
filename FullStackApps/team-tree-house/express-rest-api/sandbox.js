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
		size: String,
		color: {type: String, default: 'orange'},
		mass: {type: Number, default: 0.007},
		name: {type: String, default: 'Angela'}
	});
	
	// add dynamic data to the schema using a 'pre-save hook' - pre-hook middleware
	// the handler(callback) will be executed before mongoose saves the schema to the db
	// you CANT use fat arrows in  mongoose hooks - NOT binding the object - stick to anonymous functions
	AnimalSchema.pre('save', function(next){
		// 'this' points to the document being saved
		this.size = (this.mass >=5 && this.mass < 100)? 'medium': (this.mass >= 100)? 'big': 'small';
		next(); // tell mongoose we're done, move on to the next callback in the sequence
	});
	
	// create the model (Mongoose object), giving it a name and using the defined schema
	const Animal = mongoose.model('Animal', AnimalSchema);
	
	// create a document - instance of a model
	const elephant = new Animal({
		type: 'elephant',
		color: 'gray',
		mass: 6000,
		name: 'Lawrence'
	});
	
	const whale = new Animal({
		type: 'whale',
		mass: 100000,
		name: 'Amy'
	});
	
	const animal = new Animal({}); // generic animal
	
	// mixture of js object literals and models
	const animalData = [
		{
			type: 'mouse',
			color: 'gray',
			mass: 0.05,
			name: 'Marvin'
		},
		{
			type: 'nutria',
			color: 'brown',
			mass: 6.05,
			name: 'Gretchen'
		},
		{
			type: 'wolf',
			color: 'gray',
			mass: 45,
			name: 'Iris'
		},
		elephant,
		animal,
		whale
	];
	
	
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
	
	// const animal = new Animal({}); // generic animal
	// Animal.remove({}, (err)=>{
	// 	// empty the current collection 1st (use a query to remove specific docs)
	// 	// before executing the save
	// if(err) console.error('Failed clearing the collection', err.message);
	// 	elephant.save((err)=>{
	// 		if(err) console.error('Saving elephant failed', err.message);
	// 		animal.save((err)=>{
	// 			if(err) console.error('Saving animal failed', err.message);
	// 			db.close(()=>{
	// 				console.log('connection closed');
	// 			});
	// 		});
	// 	});
	// });
	
	
	// update the save procedure to include the whale as well
	// const animal = new Animal({}); // generic animal
	// Animal.remove({}, (err)=>{
	// 	if(err) console.error('Failed clearing the collection', err.message);
	// 	// empty the current collection 1st (use a query to remove specific docs)
	// 	// before executing the save
	// 	elephant.save((err)=>{
	// 		if(err) console.error('Saving elephant failed', err.message);
	// 		animal.save((err)=>{
	// 			if(err) console.error('Saving animal failed', err.message);
	// 			whale.save((err)=>{
	// 				if(err) console.error('Saving animal failed', err.message);
	//
	// 				// query the collection - use find to filter the collection based on animals whose 'size' ig 'big'
	// 				Animal.find({size: 'big'}, (err, animals)=>{
	// 					animals.forEach((animal)=>{
	// 						console.log(`${animal.name} the ${animal.color} ${animal.type}`);
	// 					});
	// 					db.close(()=>{
	// 						console.log('connection closed');
	// 					});
	// 				});
	//
	// 			});
	// 		});
	// 	});
	// });
	
	
	// this time pass in an array of animal data
	Animal.remove({}, (err)=>{
		if(err) console.error('Failed clearing the collection', err.message);
		// empty the current collection 1st (use a query to remove specific docs)
		// before executing the save
		Animal.create(animalData, (err, animals)=>{
			if(err) console.error('Saving animals failed', err.message);
			
			// query the collection - use find to filter the collection based on animals whose 'size' ig 'big'
			Animal.find({}, (err, animals)=>{
				animals.forEach((animal)=>{
					console.log(`${animal.name} the ${animal.color} ${animal.type} is a ${animal.size} sized animal`);
				});
				db.close(()=>{
					console.log('connection closed');
				});
			});
		})

	});
	
});