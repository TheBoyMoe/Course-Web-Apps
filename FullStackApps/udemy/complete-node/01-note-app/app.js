"use strict";
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');
const argv = yargs.argv;

// return the 3rd element of argv [] on node process
// let command = process.argv[2];
let command = argv._[0]; // 1st item in _ [] on yargs obj
let message = '', note;

// add props to the argv obj with --[prop_name], e.g node app.js --title '...' --body '.....'
// any commands added following the file name are added to the _ array, e.g node app.js list file
switch (command){
	case 'add':
		note = notes.add(argv.title, argv.body);
		message = (note)? `Note successfully created\n${notes.logNote(note)}`: 'Duplicate note';
		break;
	case 'list':
		let list = notes.getAll();
		console.log(`Printing ${list.length} note(s)`);
		list.forEach((note)=> console.log(notes.logNote(note)));
		break;
	case 'read':
		note = notes.getNote(argv.title);
		message = (note)? notes.logNote(note): 'Note not found';
		break;
	case 'remove':
		message = (notes.delete(argv.title))? `Note, title: '${argv.title}' was successfully removed`: 'Note not found';
		break;
	default:
		message = (command)? `${command} command not recognised`: 'Command not recognised';
		
}
if(!message.isEmpty) console.log(message);
// console.log('Yargs: ', argv);