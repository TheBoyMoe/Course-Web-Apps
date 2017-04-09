/*

	There are 2 types of event in node
	- system events - from c++ core - libuv, e.g finished reading a file, finished download
	- custom events - from js core - these you can create yourself  - part of the Event Emitter
	
	Often we wrap c++ functions in js to make it easier to use - often when an event occurs in libuv it will generate a custom event
	
	This emitter impl depends upn the use of magic strings, better design would be to use obj.props
	 - check config.js
 */
 
"use strict";
// const Emitter = require('./emitter'); // custom built emitter
const Emitter = require('events'); // nodejs emitter impl

const emitter = new Emitter();

// add the 'greet' event to the emitter
emitter.on('greet', ()=>{
	console.log('Hello from somewhere in the world!');
});

emitter.on('greet', ()=>{
	console.log('Goodbye from somewhere else!');
});


emitter.on('click', ()=>{
	console.log('Someone clicked on a btn');
});

// console.log(JSON.stringify(emitter, undefined, 2));

// loop through the events array with the matching pro, executing all the functions
emitter.emit('greet');
emitter.emit('click');

// avoid typos with this particular pattern
const strings = require('./config');

emitter.on(strings.events.CLICK, ()=>{
	// do something
});
emitter.on(strings.events.GREET, ()=>{
	// do something
});
