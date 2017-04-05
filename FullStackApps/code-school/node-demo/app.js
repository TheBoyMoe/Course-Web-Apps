'use strict';
const http = require('http');
const fs = require('fs');

// http.createServer((req, res)=>{
// 	res.writeHead(200);
// 	res.write('The Eagle has taken off!\n');
// 	res.end();
// }).listen(8080);

// const server = http.createServer();
//
// server.on('request', (req, res)=>{
// 	res.writeHead(200);
// 	res.write('The Eagle has taken off!\n');
// 	res.end();
// });
// server.on('close', ()=>{
// 	console.log('The Eagle has landed');
// });
// server.listen(8080);

// http.createServer((req, res)=>{
// 	res.writeHead(200);
// 	// two events on req obj - 'readable' & 'data'
// 	req.on('readable', ()=>{
// 		let chunk;
// 		while(null !== (chunk = req.read())){
// 			res.write(chunk);
// 		}
// 	});
// 	req.on('end', ()=>{
// 		res.end();
// 	});
// }).listen(8080);

//let file = fs.createReadStream('./package.json');
//let copy = fs.createWriteStream('./copy.json');
//file.pipe(copy); // pipe output of one into the input of the other

// write the contents of the request to a file using streams
http.createServer((req, res)=>{
	let file = fs.createWriteStream('./data.md');
	
	
	req.pipe(file);
	req.on('end', ()=>{
		res.end('file upload complete');
	})
}).listen(8080);


console.log('Listening on port 8080...');