/*
	References:
	[1] https://github.com/tj/axon (pub/sub server)

 */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

const app = express();

// middleware - parse any json data in the body of any request
app.use(bodyParser.json());

// routes
app.post('/', (req, res)=>{
	res.send('hello world!');
});

app.listen(port, ()=>{
	console.log(`Express is listening on port ${port}`);
});