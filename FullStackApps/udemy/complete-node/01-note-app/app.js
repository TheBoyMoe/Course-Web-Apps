"use strict";
const fs = require('fs');
const _ = require('lodash');

const notes = require('./notes');

let command = process.argv[2]; // return the 3rd element
let message;

switch (command){
	case 'add':
		message = 'Adding a new note';
		break;
	case 'list':
		message = 'Listing all notes';
		break;
	case 'read':
		message = 'Reading note';
		break;
	case 'remove':
		message = 'Remove note';
		break;
	default:
		message = 'Command not recognised'
}

console.log('Command: ', message);