'use strict';
const request = require('request');

request({
	url: 'https://maps.googleapis.com/maps/api/geocode/json?address=25%20lomdard%20street%20london',
	json: true
}, (error, response, body)=>{
	// print all objects
	// console.log(JSON.stringify(body, undefined, 2)); // number is indentation
	let item = body.results[0];
	let itemLocation = item.geometry.location;
	console.log(`Address: ${item['formatted_address']}, lat: ${itemLocation.lat}, lng: ${itemLocation.lng}`);
	
});