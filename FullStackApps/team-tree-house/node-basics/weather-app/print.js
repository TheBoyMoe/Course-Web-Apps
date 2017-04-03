'use strict';

// helper functions
const printMessage = (forecast)=>{
	const message =
		`Location: ${forecast.location.city},${forecast.location.country}` +
		` temperature ${forecast.current_observation.temp_c}C` +
		` relative humidity ${forecast.current_observation.relative_humidity}`;
	console.log(message);
};

const printErrorMessage = (location, message)=>{
	console.error(location, message);
};

module.exports.success = printMessage;
module.exports.error = printErrorMessage;