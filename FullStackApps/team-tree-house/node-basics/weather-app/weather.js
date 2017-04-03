const https = require('https');
const api = require('./api.json');
const print = require('./print.js');

// Print out error message

function getForcast(query) {
	const request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`, (response) => {
		let str = '';
		// Read the data
		response.on('data', chunk => {
			str += chunk;
		});
		response.on('end', () => {
			try {
				const weather = JSON.parse(str);
				print.success(weather);
			} catch(e) {
				print.error('JSON parsing error:', e.message);
			}
		});
	});
}

module.exports.get = getForcast;

//TODO: Handle any errors