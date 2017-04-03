/*
	References:
	[1] https://nodejs.org/api/https.html#https_https_get_options_callback

 */

const https = require('https'); // built in to node

https.get('https://encrypted.google.com/', (res) => {
	// callback executed when response recived from server
	
	// node has certain system events,e.g. 'data', 'statusCode', that are triggered when a p[articular event happens
	console.log('statusCode:', res.statusCode); // success/or not of the request
	console.log('headers:', res.headers); // any meta data sent be the server
	
	res.on('data', (d) => {
		process.stdout.write(d); // display the reply on the processes std output
	});
	
}).on('error', (e) => { // throws error if no callback is provided to handle errors in the event of an error
	console.error(e); // you can use console.log/dir/error/info?
});