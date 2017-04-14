/*
	References:
	[1] https://httpstatuses.com/ (http status codes)
	
 */
'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User}  = require('./models/user');

const app = express();

// POST / - create a resource - use a POST, include the data in the body of the request
// server will receive the json, create doc, save to db and send the doc back to the client
// body parser will take the json and convert to an obj
app.use(bodyParser.json()); // middleware


app.post('/todos', (req, res)=>{
	let todo = new Todo({
		text: req.body.text
	});
	todo.save().then((doc)=>{
		res.send(doc);
	}, (err)=>{
		console.error('Unable to save todo ', err);
		res.status(400).send({ // 400 === bad request
			status: 400,
			text: 'Unable to save todo to server',
			error: err
		});
	});
});


app.listen(3000, ()=>{
	console.log('Express is listening on port 3000...');
});
