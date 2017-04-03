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
const request = https.get(`https://teamtreehouse.com/${username}.json`, (res)=>{
	console.dir(res);
	
	// 2. read the json data
	
	// 3. parse the json string
	
});


// 4. display the data
const printMessage = (username, badgeCount, points)=>{
	return `${username} has ${badgeCount} badges and ${points} points in javascript!`;
};

console.log(printMessage('tom', 10, 2345));