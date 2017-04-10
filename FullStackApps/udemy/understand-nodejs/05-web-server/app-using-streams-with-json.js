'use strict';
const http = require('http');
const fs = require('fs');

// http inherits from the event emitter - the callback is invoked when
// the 'request' event is triggered
http.createServer((req, res)=>{
	
	const data = [
		{
			firstname: 'Tom',
			lastname: 'Jones'
		},
		{
			firstname: 'Peter',
			lastname: 'Jones'
		}
	];
	res.writeHead(200, {'Content-Type': 'application/json '});
	res.end(JSON.stringify(data)); // serialize js obj array into json
	
}).listen(3000, '127.0.0.1');