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
 	[8] https://nodejs.org/docs/latest/api/process.html#process_process_argv
 	[9] https://nodejs.org/api/modules.html#modules_file_modules
 	[10] https://nodejs.org/api/modules.html#modules_module_exports
 	
*/

// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

// example student profile url
// https://teamtreehouse.com/williamfero.json

'use strict';

const https = require('https');
const http = require('http');

// helper functions
const printMessage = (username, badgeCount, points)=>{
	const message = `${username} has ${badgeCount} badges and ${points} points in javascript!`;
	console.log(message);
};

const printErrorMessage = (location, message)=>{
	console.error(location, message);
};

// fetch user profile info
const getUserInfo = (username)=>{
	
	// use a try/catch block to catch errors resulting from malformed url's
	try {
		// 1. connect to the treehouse api (https://teamtreehouse.com/username.json)
		const request = https.get(`https://teamtreehouse.com/${username}.json`, (response)=>{
			const statusCode = response.statusCode;
			if(statusCode !== 200){
				// use http.STATUS_CODES to access the status codes' description
				const message = `error fetching profile info for user ${username} (${http.STATUS_CODES[statusCode]})`;
				const statusCodeError = new Error(message);
				printErrorMessage('Response: ', statusCodeError.message);
				
			} else {
				
				let str = '';
				// 2. read the json data - the res obj executes a 'data' event when the data is received
				response.on('data', (data) => {
					// data obj - separate data packets in the form of a buffer read from the stream
					// convert to a string using toString(), and concatenate together
					// when ever you see a 'data' event in node, there's always an 'end' event
					// which indicates when reading data from the stream has completed
					
					// console.log('data', data.toString());
					
					str += data.toString(); // call toString since the reply is a buffer in chunks
				});
				
				// display the json str when the end of the stream has been reached
				response.on('end', () => {
					// console.log(str);
					// catch any json parsing errors
					try {
						
						// 3. parse the json string (using native js obj) into an object so that we can
						// retrieve the necessary properties programmatically
						const userProfile = JSON.parse(str);
						//console.dir(userProfile);
						
						// 4. display the data
						printMessage(username, userProfile.badges.length, userProfile.points.JavaScript);
						
					} catch (error) {
						printErrorMessage('JSON parsing error:', error.message);
					}
					
				})
			}
			
		});
		
		// error handler - if the server responds with an error event, and an error handler
		// has not been set - an exception is thrown and stack trace shown
		request.on('error', (err)=>{
			printErrorMessage('Server error message:', err.message);
		});
		
	} catch(error){
		printErrorMessage('Malformed url: ',error.message);
	}
	
};

// 5. return user info for multiple users
// const users = ['alenaholligan', 'chalkers', 'williamfero', 'davemcfarland'];
// for(let user of users)
//	getUserInfo(user);

// 6. use node's process global object to pass usernames via the cmd line
// - create a cmd line app, e.g node app.js [username] [username] [etc]
// argv property no process obj returns an array, users starting from index 2 onwards
let users = process.argv.slice(2);
for(let user of users)
	getUserInfo(user);


