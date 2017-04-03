'use strict';

const https = require('https');
const http = require('http');
const print = require('./print.js');

const getUserInfo = (username)=>{
	
	try {
		const request = https.get(`https://teamtreehouse.com/${username}.json`, (response)=>{
			const statusCode = response.statusCode;
			if(statusCode !== 200){
				const message = `error fetching profile info for user ${username} (${http.STATUS_CODES[statusCode]})`;
				const statusCodeError = new Error(message);
				print.error('Response: ', statusCodeError.message);
				
			} else {
				
				let str = '';
				response.on('data', (data) => {
					str += data.toString();
				});
				
				response.on('end', () => {
					try {
						const userProfile = JSON.parse(str);
						print.success(username, userProfile.badges.length, userProfile.points.JavaScript);
						
					} catch (error) {
						print.error('JSON parsing error:', error.message);
					}
				})
			}
			
		});
		
		request.on('error', (err)=>{
			print.error('Server error message:', err.message);
		});
		
	} catch(error){
		print.error('Malformed url: ',error.message);
	}
	
};

module.exports.get = getUserInfo;