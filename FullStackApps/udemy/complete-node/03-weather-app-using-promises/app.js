/*
	References:
	[1] https://www.npmjs.com/package/axios
	
 */

'use strict';
const yargs = require('yargs');
const axios = require('axios');

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

const encodedAddress = encodeURIComponent(argv.address);
const geocodedUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodedUrl)
	.then((response)=>{
		if(response.data.status === 'ZERO_RESULTS')
			throw new Error('Unable to find that address'); // caught by the catch block
		
		const apikey = '840178050c6f75f3641a44e2f2f547e2';
		const location = response.data.results[0].geometry.location;
		const lat = location.lat, lng = location.lng;
		const weatherUrl = `https://api.darksky.net/forecast/${apikey}/${lat},${lng}`;
		
		console.log(response.data.results[0].formatted_address);
		
		// chain a 2nd promise
		return axios.get(weatherUrl);
		
	})
	.then((response)=>{
		const weatherInfo = response.data.currently;
		const temperature = weatherInfo.temperature;
		const apparentTemp = weatherInfo.apparentTemperature;
		console.log(`It's currently ${temperature}, it feels like ${apparentTemp}.`);
	})
	.catch((error)=>{
		//console.error(error);
		if(error.code === 'ENOTFOUND')
			console.error('Unable to fetch results.');
		else
			console.error(error.message);
});
