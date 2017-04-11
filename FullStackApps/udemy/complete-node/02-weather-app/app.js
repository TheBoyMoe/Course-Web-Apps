'use strict';
const request = require('request');
const yargs = require('yargs');

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

// console.log(argv);

// encodeURIComponent(str) / decodeURIComponent(encodedStr)
// fetch the address from the cli and encode it
let encodedAddress = encodeURIComponent(argv.address);

request({
	url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
	json: true
}, (error, response, body)=>{
	// print all objects
	// console.log(JSON.stringify(body, undefined, 2)); // number is indentation
	let item = body.results[0];
	let itemLocation = item.geometry.location;
	console.log(`Address: ${item['formatted_address']}, lat: ${itemLocation.lat}, lng: ${itemLocation.lng}`);
	
});