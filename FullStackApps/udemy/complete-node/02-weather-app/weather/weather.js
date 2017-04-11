"use strict";
const request = require('request');

// Example url: 'https://api.darksky.net/forecast/840178050c6f75f3641a44e2f2f547e2/37.8267,-122.4233'

const apikey = '840178050c6f75f3641a44e2f2f547e2';

const getWeather = (lat, lng, callback)=>{
	
	request({
		url: `https://api.darksky.net/forecast/${apikey}/${lat},${lng}`,
		json: true
	}, (error, response, body)=>{
		if(!error && response.statusCode === 200 ) {
			let data = body.currently;
			callback(undefined, {
				Temperature: `${data.temperature}`,
				humidity: `${data.humidity}`,
				pressure: `${data.pressure}`
			})
		} else
			callback('Unable to fetch weather');
	});
	
};

module.exports = {
	getWeather
};