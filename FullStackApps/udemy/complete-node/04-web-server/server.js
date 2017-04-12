'use strict';
const express = require('express');

const app = express();

// register handler for 'get' request
app.get('/', (req, res)=>{
	// res.send('<h1>Express is listening.......</h1>');
	// automatically converted to json - content-type in header set to 'application/json'
	res.send({
		firstname: 'Tom',
		lastname: 'Jones',
		age: 45,
		likes: ['walking', 'baking', 'hiking', 'coding']
	})
	
});

app.get('/about', (req, res)=>{
	res.send('<h1>You landed on the bout page</h1>');
});

app.get('/bad', (req, res)=>{
	res.send({
		errorMessage: 'Unable to fulfill request'
	})
});

app.listen(3000);