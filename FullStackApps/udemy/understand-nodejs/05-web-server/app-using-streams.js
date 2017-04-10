'use strict';
const http = require('http');
const fs = require('fs');

// http inherits from the event emitter - the callback is invoked when
// the 'request' event is triggered
http.createServer((req, res)=>{
	
	res.writeHead(200, {'Content-Type': 'text/html'});
	// using a stream you can read the file contents asynchronously, and out out
	// each chunk, when the buffer is full, to the response via the pipe
	fs.createReadStream(`${__dirname}/index.html`).pipe(res);
	
}).listen(3000, '127.0.0.1');