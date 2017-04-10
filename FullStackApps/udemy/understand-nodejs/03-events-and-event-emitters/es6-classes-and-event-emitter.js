/*
 Same example as in app2.js, except using ES6 Classes
 */
'use strict';

const EventEmitter = require('events');

// create the function constructor that will do the inheriting
class Greetr extends EventEmitter{
	constructor() {
		super(); // call to the parent's constructor, pass in parameters when req'd
		this.greeting = `Hello everyone, it's`;
	}
	
	// all methods are added to the prototype
	greet(data){
		console.log(`${this.greeting} ${data}`);
		this.emit('greet', data); // available on the EventEmitter's prototype
	}
}


let greet1 = new Greetr();
greet1.on('greet', (data)=>{
	console.log(`${data} said hello`); // callback function placed in the event array
});

greet1.greet('Tom');