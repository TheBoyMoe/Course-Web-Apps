"use strict";
const fs = require('fs');

const fetchNotes = ()=>{
	// check if any notes have been previously saved
	try {
		let notesStr = fs.readFileSync(`${__dirname}/notes-data.json`, 'utf-8');
		return JSON.parse(notesStr); // parse the string into js objs returning the array
	} catch (e){
		return [];
	}
};

const saveNotes = ()=>{

};

const addNote = (title, body)=>{
	let notes = fetchNotes();
	let note = {
		title: title,
		body: body
	};
	
	// check if the note already exists, before adding it
	let duplicateNotes = notes.filter((note)=>{
		return note.title === title;
	});
	
	// if duplicates length > 0 , note already exists
	if(duplicateNotes.length < 1) {
		notes.push(note);
		fs.writeFileSync(`${__dirname}/notes-data.json`, JSON.stringify(notes));
	} else {
		console.log('Duplicate found');
	}
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
