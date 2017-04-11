'use strict';
// const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
// config cmd line entry using yargs
const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Fetch the weather for the entered address',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;


geocode.getLocation(argv.address, (errorMessage, results)=>{
	(errorMessage)? console.log(errorMessage): console.log(JSON.stringify(results, undefined, 2));
});

weather.getWeather(37.8267, -122.4233, (errorMessage, results)=>{
	(errorMessage)? console.log(errorMessage): console.log(JSON.stringify(results, undefined, 2));
});



// FETCH GEOCODE DATA FROM GOOGLE API
// // encodeURIComponent(str) / decodeURIComponent(encodedStr)
// // fetch the address from the cli and encode it
// let encodedAddress = encodeURIComponent(argv.address);

// request({
// 	url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
// 	json: true
// }, (error, response, body)=>{
// 	// console.log(JSON.stringify(body, undefined, 2)); // number is indentation
// 	if(error) console.log('Unable to connect to the Google Servers');
// 	else if(body.status === 'ZERO_RESULTS') console.log('Unable to find the submitted address');
// 	else if(body.status === 'OK') {
// 		let item = body.results[0];
// 		let itemLocation = item.geometry.location;
// 		console.log(`Address: ${item['formatted_address']}, lat: ${itemLocation.lat}, lng: ${itemLocation.lng}`);
// 	} else
// 		console.log('Unknown error occurred, try again');
// });