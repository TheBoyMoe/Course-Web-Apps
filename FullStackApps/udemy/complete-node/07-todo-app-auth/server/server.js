/*
	References:
	[1] https://httpstatuses.com/ (http status codes)
	
	Note - Heroku setup:
	- set the port to use a process.env variable
	- add a start script, "start": "node server/server.js", to package.json so host provider knows how to start app
	- add, engines: {"node": "6.9.3"}, to package.json so Heroku knows what ver of node you need
			- you need v6+ to use ES6 features
	- setup mongo database - specific to the host provider
		- check sec 4/ video 9 on heroku setup
		- on Heroku use the mLab MongoDB add-on - check video sec 6/ video 22 4:30min onwards
		- amend the mongoose connector in mongoose.js to use process.env.MONGODB_URI || localhost to connect ot the database
	
	- when the app is run locally - by default the 'env' value will be set to 'development'
	- Heroku automatically sets process.env to 'production'
	- To run in test, either:
		- $ npm test OR $ npm run test-watch (scripts in package.json)
 */
'use strict';
require('./config/config'); // set 'env'

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User}  = require('./models/user');

const app = express();

const port = process.env.PORT; // use port provided by host, or 3000 locally

// POST / - create a resource - use a POST, include the data in the body of the request
// server will receive the json, create doc, save to db and send the doc back to the client
// body parser will take the json and convert to an obj
app.use(bodyParser.json()); // middleware

// create todos
app.post('/todos', (req, res)=>{
	let todo = new Todo({
		text: req.body.text
	});
	todo.save().then((doc)=>{
		res.send(doc);
	}, (err)=>{
		res.status(400).send(err);
	});
});

// get todos - return all of them
app.get('/todos', (req, res)=>{
	Todo.find().then((todos)=>{
		// return the todos as an object instead of an array, allows you to add props, eg status code
		res.send({todos});
	}, (err)=>{
		res.status(400).send(err);
	});
});

// get todo - return individual todo item
app.get('/todos/:id', (req, res)=>{
	let id = req.params.id; // grab the id supplied by the client
	
	// 1. check if id is valid
	if(!ObjectID.isValid(id)){
		res.status(404).send({
			code: 404,
			error: 'Invalid id'
		});
	} else {
		// 2. query Todo collection - does it exist
		Todo.findById(id).then((todo)=>{
			if(!todo) return res.status(404).send({
				code: 404,
				error: 'Todo not found'
			});
			
			// instead of responding with the todo, add it as a prop of an object,
			// allows you to add further props to the returned obj in future without breaking the api
			res.send({todo});
			
		}).catch((e) => res.status(400).send({
			code: 400,
			error: 'Bad request'
		}));
	}
	
});

// remove individual todos from mongo
app.delete('/todos/:id', (req, res)=>{
	const id = req.params.id;
	if(!ObjectID.isValid(id)) {
		res.status(404).send({
			code: 404,
			error: 'Invalid id'
		});
	} else {
		Todo.findByIdAndRemove(id).then((todo)=>{
			if(!todo) return res.status(404).send({
				code: 404,
				error: 'Todo not found'
			});
			res.send({todo});
			
		}).catch((e) => res.status(400).send({
			code: 400,
			error: 'Bad request'
		}));
	}
});

// update todo items
app.patch('/todos/:id', (req, res)=>{
	const id = req.params.id;
	if(!ObjectID.isValid(id)) {
		return res.status(404).send({
			code: 404,
			error: 'Invalid id'
		});
	}
	
	// pick of the 'text' and 'completed' props off of the body obj
	const body = _.pick(req.body, ['text', 'completed']);
	
	// check that completed is a boolean and is set to true
	if(_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null; // in mongo set values to null when there is no value
	}
	
	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo)=>{
		if(!todo){
			return res.status(404).send({
				code: 404,
				error: 'Todo not found'
			});
		}
		res.send({todo});
		
	}).catch((e)=>{
		res.status(400).send({
			code: 400,
			error: 'Failed to update todo'
		});
	});
	
});

// POST /users - create new users in mongo, ensure email is unique and valid
app.post('/users', ((req, res)=>{
    // get the email and password properties off of the req body
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body); // enough to pass in the obj to both validate and create the user obj
    user.save().then(()=>{
        return user.generateAuthToken();
    }).then((token)=>{
        // send the token back within a http header
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e)
    });
}));


app.listen(port, ()=>{
	console.log(`Express is listening on port ${port}...`);
});

// export the app so it's accessible from the tests file
module.exports = {
	app
};