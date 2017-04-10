"use strict";
const fs = require('fs');

// fetch and read the file synchronously - waits for the operation to complete before moving on
// - reads the file into a buffer and converts to a string using utf-8 encoding
const data = fs.readFileSync(`${__dirname}/syncFile.txt`, 'utf-8');
console.log(data);

// reading files asynchronously - callback is invoked when the operation completes
// std pattern in node is the error 1st callback - 1st parameter is always an error
// - null if no error occurred
/*
const file = fs.readFile(`${__dirname}/asyncFile.txt`, (err, data)=>{
	if(err) return console.log(`Error occurred reading file contents: ${err.message}`);
	// by default a buffer is returned - unless you pass in the encoding
	console.log(data.toString());
});
*/

const string = fs.readFile(`${__dirname}/asyncFile.txt`, 'utf-8', (err, data)=>{
	if(err) return console.log(`Error occurred reading file contents: ${err.message}`);
	console.log(data);
});

console.log('DONE!');