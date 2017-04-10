'use strict';
const http = require('http');

// http inherits from the event emitter - the callback is invoked when
// the 'request' event is triggered
http.createServer((req, res)=>{
	
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello. My name Node, your friendly neighborhood web server......\n');
	
}).listen(8080, '127.0.0.1');