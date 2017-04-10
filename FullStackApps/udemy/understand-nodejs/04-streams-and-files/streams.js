"use strict";
const fs = require('fs');

// create a custom read stream which inherits from Readable,
// which inherits from Stream, Stream inherits from Event Emitter
// - you custom read stream is thus an event emitter and has access
// to those props and methods, e.g .on(), .emit(), etc
const readable = fs.createReadStream(`${__dirname}/largeFile.txt`, {
	encoding: 'utf-8', // set string encoding otherwise stream returns the buffer
	highWaterMark: 8 * 1024 // 8KB buffer/chunk size, default is 64KB
});

const writable = fs.createWriteStream(`${__dirname}/largeFileCopy.txt`);

// each tim the buffer is filled, the 'data' event is triggered
readable.on('data', (chunk)=>{
	console.log(chunk.length); // print out the size of each chunk
	writable.write(chunk); // write chunk to the file
});