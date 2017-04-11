"use strict";
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');
const argv = yargs.argv;

// return the 3rd element of argv [] on node process
// let command = process.argv[2];
let command = argv._[0]; // 1st item in _ [] on yargs obj

// add props to the argv obj with --[prop_name], e.g node app.js --title '...' --body '.....'
// any commands added following the file name are added to the _ array, e.g node app.js list file
switch (command){
	case 'add':
		notes.add(argv.title, argv.body);
		break;
	case 'list':
		notes.getAll();
		break;
	case 'read':
		notes.getNote(argv.title);
		break;
	case 'remove':
		notes.delete(argv.title);
		break;
	default:
		let message = (command)? `${command} command not recognised`: 'Command not recognised';
		console.log(message);
}

// console.log('Yargs: ', argv);