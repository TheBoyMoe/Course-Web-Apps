'use strict';
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
	if(errorMessage) {
		console.log(errorMessage)
	} else {
		// fetch the weather with the retrieved lat lng results
		weather.getWeather(results.lat, results.lng, (errorMessage, weather)=>{
			if(errorMessage) {
				console.log(errorMessage)
			} else {
				results.temperature = weather.temperature;
				results.humidity = weather.humidity;
				results.pressure = weather.pressure;
				console.log(JSON.stringify(results, undefined, 2));
			}
		});
	}
});
