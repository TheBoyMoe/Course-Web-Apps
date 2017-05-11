'use strict';
const fs = require('fs');
const path = require('path');

fs.readFile('data.txt', (err, data)=>{
	if(err) return console.error('Unable to read file');
	// console.log(data.toString());
});


// Normalize a path
console.log(path.normalize('/test/test1//2slashes/1slash/tab/..')); // /test/test1/2slashes/1slash

// Join multiple paths together
console.log(path.join('/first', 'second', 'something', 'then', '..')); // /first/second/something

// Resolve a path (find the absolute path)
console.log(path.resolve('first.js'));

// Find the extention of a filename
console.log(path.extname('main.js')); // .js

// Process
console.log(process.argv);