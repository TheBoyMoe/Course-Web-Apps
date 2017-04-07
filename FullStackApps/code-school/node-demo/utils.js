/*
	export the following methods
 */
"use strict";
const http = require('http');

const helloFrom = (message)=>{
	return `Hello from ${message}`;
};

const goodbyeFrom = (username)=>{
	return `This is ${username} saying goodbye for now!`;
};


const makeRequest = (message)=>{
	let options = {
		host: 'localhost',
		port: 8080,
		path: '/',
		method: 'POST'
	};
	
	// configure the response to the client
	let request = http.request(options, (response) => {
		response.on('data', (data) => {
			// log the data received from the client request
			console.log(data);
		})
	});
	request.write(message);
	request.end();
};

module.exports.hello = helloFrom;
module.exports.goodbye = goodbyeFrom;
module.exports.makeRequest = makeRequest;