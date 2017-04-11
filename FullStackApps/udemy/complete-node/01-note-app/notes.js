"use strict";
const fs = require('fs');

const fetchNotes = ()=>{
	// fetch the notes from the file system
	try {
		let notesStr = fs.readFileSync(`${__dirname}/notes-data.json`, 'utf-8');
		return JSON.parse(notesStr); // parse the string into js objs returning the array
	} catch (e){
		return [];
	}
};

const saveNotes = (notes)=>{
	// save the notes array to the file system - overwrites any existing file
	fs.writeFileSync(`${__dirname}/notes-data.json`, JSON.stringify(notes));
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
		saveNotes(notes); // save notes to file system
		return note;
	}
	
};

const getAll = ()=>{
	console.log('Get all notes')
};

const getNote = (title)=>{
	let notes = fetchNotes();
	// return note
	return notes.filter((note)=>{
		return note.title === title;
	})[0];
};

const deleteNote = (title)=>{
	// fetch notes
	let notes = fetchNotes();
	// filter notes, removing the duplicate
	let newNotes;
	if(notes.length > 0) {
		newNotes = notes.filter((note)=>{
			return note.title !== title; // returns not if the condition is true
		})
	}
	// save new notes array
	saveNotes(newNotes);
	
	return notes.length > newNotes.length;
};

module.exports = {
	add: addNote,
	getAll: getAll,
	getNote: getNote,
	delete: deleteNote
};
