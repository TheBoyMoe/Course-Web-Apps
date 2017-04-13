/*
	References:
	[1] https://github.com/visionmedia/supertest (test your node http servers)
	[2] https://github.com/visionmedia/superagent (assertion library for super test)
	[3] http://visionmedia.github.io/superagent/

 */
"use strict";
const express = require('express');

const app = express();

app.get('/', (req, res)=>{
	// res.status(200).send('Hello world!');
	res.status(404).send({
		error: 'Page not found',
		name: 'Todo App v1.0'
	});
});

app.listen(3000, ()=>{
	console.log('Express is listening.....');
});

module.exports.app = app;