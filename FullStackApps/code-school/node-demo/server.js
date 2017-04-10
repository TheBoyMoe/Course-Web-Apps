"use strict";

const http = require('http');
const request = require('request');
const socket = require('socket.io');
const url = ('url');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = socket(server);

// client connected
io.on('connection', (client)=>{
	console.log('Client connected....');
});

app.get('/', (req, res)=>{
	res.sendFile(`${__dirname}/index.html`);
});

server.listen(8080``);




// return the index.html file to any requests to '/'
// app.get('/', (req, res)=>{
// 	res.sendFile(`${__dirname}/index.html`);
// }).listen(8080, ()=>{
// 	console.log('Express is listening on port 8080.....');
// });




// TODO requires auth to work
/*
app.get('/tweets/:username', (req, res)=>{
	// grab the user name out of the request parameters
	let username = req.params.username;
	const options = {
		protocol: 'http',
		host: 'api.twitter.com',
		pathname: '1/statuses/user_timeline.json',
		query: {screen_name: username, count: 10}
	};
	// grab the tweets from twitter and pipe the response into the response obj
	let twitterUrl = url.format(options);
	request(twitterUrl).pipe(res);
	
});
*/

