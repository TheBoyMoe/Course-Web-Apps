'use strict';
const request = require('request');

const getLocation = (address, callback)=>{
	let encodedAddress = encodeURIComponent(address);
	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
		json: true
	}, (error, response, body)=>{
		
		if(error)
			callback('Unable to connect to the Google Servers');
		else if(body.status === 'ZERO_RESULTS')
			callback('Unable to find the submitted address');
		else if(body.status === 'OK') {
			let item = body.results[0];
			let itemLocation = item.geometry.location;
			callback(undefined, {
				Address: `${item['formatted_address']}`,
				lat: `${itemLocation.lat}`,
				lng: `${itemLocation.lng}`
			}
		);
		} else
			callback('Unknown error occurred, try again');
	});
	
};

module.exports = {
	getLocation
};