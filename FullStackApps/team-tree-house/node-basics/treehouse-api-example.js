/*
	Note:
	- node has a number of system events, e.g data, completion and error events, we can use to trigger a callback.
 	- While the APIs for http and https are closely mirrored https doesn't have the STATUS_CODES object.
 	- You still need to use https for all the API calls but you'll also need http for access to STATUS_CODES.
 	- include http & https modules
 	
 	References:
 	[1] https://nodejs.org/api/http.html#http_http_get_options_callback
 	[2] https://nodejs.org/api/https.html#https_https_get_options_callback
 	[3] https://nodejs.org/api/http.html#http_http_status_codes
 	[4] https://nodejs.org/api/modules.html#modules_module_require_id
 	[5] https://nodejs.org/api/stream.html#stream_event_data
 	[6] https://nodejs.org/api/stream.html#stream_event_end
 	[7] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
 	
*/

// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

// example student profile url
// https://teamtreehouse.com/williamfero.json

'use strict';

const https = require('https');
const http = require('http');
const username = 'williamfero';

// 1. connect to the treehouse api (https://teamtreehouse.com/username.json)
const request = https.get(`https://teamtreehouse.com/${username}.json`, (response)=>{
	console.log(response.statusCode);
	let str = '';
	// 2. read the json data - the res obj executes a 'data' event when the data is received
	response.on('data', (data)=>{
		// data obj - separate data packets in the form of a buffer read from the stream
		// convert to a string using toString(), and concatenate together
		// when ever you see a 'data' event in node, there's always an 'end' event
		// which indicates when reading data from the stream has completed
		
		// console.log('data', data.toString());
		
		str += data.toString();
	});
	
	// display the json str when the end of the stream has been reached
	response.on('end', ()=>{
		// console.log(str);
		
		// 3. parse the json string (using native js obj) into an object so that we can
		// retrieve the necessary properties programmatically
		const userProfile = JSON.parse(str);
		//console.dir(userProfile);
		let message = printMessage(username, userProfile.badges.length, userProfile.points.JavaScript);
		console.log(message);
	})
	
});

// error handler - if the server responds with an error, and an error handler
// has not been set - error thrown
request.on('error', (err)=>{
	console.error('Server error', err.message);
});


// 4. display the data
const printMessage = (username, badgeCount, points)=>{
	return `${username} has ${badgeCount} badges and ${points} points in javascript!`;
};
