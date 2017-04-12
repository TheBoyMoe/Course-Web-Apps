'use strict';
const request = require('request');

// request does not support promises, wrap it within a promise to use it.
const geocodeAddress = (address)=>{
	return new Promise((resolve, reject)=>{
		let encodedAddress = encodeURIComponent(address);
		request({
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
			json: true
		}, (error, response, body)=>{
			if(error) reject('Unable to connect to Google Servers');
			else if(body.status === 'ZERO_RESULTS') reject('Unable to find address');
			else if(body.status === 'OK') {
				let item = body.results[0];
				let itemLocation = item.geometry.location;
				resolve({
					address: `${item['formatted_address']}`,
					lat: `${itemLocation.lat}`,
					lng: `${itemLocation.lng}`
				});
			} else {
				reject('Unknown error');
			}
		});
	});
};

geocodeAddress('90210').then((location)=>{
	console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage)=>{
	console.error(errorMessage);
});
