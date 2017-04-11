"use strict";

const addNote = (title, body)=>{
	console.log('Add note: ', title, body);
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
