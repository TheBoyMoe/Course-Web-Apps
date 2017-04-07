'use strict';
const http = require('http');
const fs = require('fs');
const utils = require('./utils.js');


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
	// let file = fs.createWriteStream('./data.md'); // location of the new file
	// let fileBytes = req.headers['content-length'];
	// let uploadedBytes = 0;
	//
	// // listen for the 'readable' event and read the file a chunk at a time from the req stream
	// req.on('readable', ()=>{
	// 	let chunk;
	// 	while((chunk = req.read()) !== null){
	// 		uploadedBytes += chunk.length;
	// 		let progress = (uploadedBytes/fileBytes) * 100;
	// 		// send the progress back to the client
	// 		res.write(`progress: ${parseInt(progress, 10)}%\n`);
	// 	}
	// });
	// req.pipe(file);
	// req.on('end', ()=>{
	// 	res.end('file upload complete'); // close the stream
	// })
}).listen(8080);

let message = 'He\'s looking at you kid!';
utils.makeRequest(message);

console.log(utils.hello('Francis!'));
console.log(utils.goodbye('John'));
console.log('Listening on port 8080...');