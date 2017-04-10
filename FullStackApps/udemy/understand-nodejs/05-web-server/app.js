'use strict';
const http = require('http');
const fs = require('fs');

// http inherits from the event emitter - the callback is invoked when
// the 'request' event is triggered
http.createServer((req, res)=>{
	
	res.writeHead(200, {'Content-Type': 'text/html'});
	// res.end('Hello. My name Node, your friendly neighborhood web server......\n');
	const html = fs.readFileSync(`${__dirname}/index.html`);
	res.end(html);
	
	
}).listen(3000, '127.0.0.1');