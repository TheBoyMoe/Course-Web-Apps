const fs = require('fs');

// define the note
const note = {
	title: 'Title of the original note',
	body: 'Some filler text....................... and more.................'
};

// convert to json string
let jsonString = JSON.stringify(note);

// write json string to file system
fs.writeFileSync(`${__dirname}/data.json`, jsonString);

// read json string from file system - inc char encoding otherwise you get a buffer
let str = fs.readFileSync(`${__dirname}/data.json`, 'utf-8');

// parse json string
let obj = JSON.parse(str);

// test
console.log(typeof obj === 'object');
console.log(obj.title, '\n', obj.body);