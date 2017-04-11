"use strict";
const fs = require('fs');


const addNote = (title, body)=>{
	let notes = [];
	let note = {
		title: title,
		body: body
	};
	
	// check if any notes have been previously saved
	try {
		let notesStr = fs.readFileSync(`${__dirname}/notes-data.json`, 'utf-8');
		notes = JSON.parse(notesStr); // parse the string into js objs
	} catch (e){
		console.error('Error parsing saved notes', e.message);
	}
	
	notes.push(note);
	fs.writeFileSync(`${__dirname}/notes-data.json`, JSON.stringify(notes));
};

const getAll = ()=>{
	console.log('Get all notes')
};

const getNote = (title)=>{
	console.log('Get note: ', title);
};

const deleteNote = (title)=>{
	console.log('Delete note: ', title);
};

module.exports = {
	add: addNote,
	getAll: getAll,
	getNote: getNote,
	delete: deleteNote
};
