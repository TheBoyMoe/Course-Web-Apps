"use strict";

const http = require('http');
const request = require('request');
const url = ('url');
const express = require('express');

const app = express();

// app.get('/', (req, res)=>{
// 	res.sendFile(`${__dirname}/index.html`);
// }).listen(8080, ()=>{
// 	console.log('Express is listening on port 8080.....');
// });

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

