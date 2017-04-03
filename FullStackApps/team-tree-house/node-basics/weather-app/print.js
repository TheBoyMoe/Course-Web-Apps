'use strict';

// helper functions
const printMessage = (query, forecast)=>{
	let message = '';
	if(forecast.location){
		message =
			`Location: ${forecast.location.city},${forecast.location.country}` +
			` temperature ${forecast.current_observation.temp_c}C` +
			` relative humidity ${forecast.current_observation.relative_humidity}`;
	} else {
		message = `Location ${query} not found`;
	}
	console.log(message);
};

const printErrorMessage = (type, message)=>{
	console.error(type, message);
};

module.exports.message = printMessage;
module.exports.error = printErrorMessage;