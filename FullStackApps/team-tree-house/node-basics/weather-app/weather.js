'use strict';

const https = require('https');
const http = require('http');
const api = require('./api.json');
const print = require('./print.js');

// Print out error message

function getForecast(query) {
	try {
		const request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`, (response) => {
			const statusCode = response.statusCode;
			if(statusCode !== 200){
				const message = `error fetching weather forecast for ${query} (${http.STATUS_CODES[statusCode]})`;
				print.error('Response ', message);
			} else {
				
				let str = '';
				// Read the data
				response.on('data', chunk => {
					str += chunk;
				});
				response.on('end', () => {
					try {
						const weather = JSON.parse(str);
						print.message(query, weather);
					} catch (e) {
						print.error('JSON parsing error:', e.message);
					}
				});
			}
		});
		
		request.on('error', (e)=>{
			print.error('Server error message: ', e.message);
		})
		
	} catch(e) {
		print.error('Malformed url: ', e.message);
	}
	
}

module.exports.get = getForecast;
