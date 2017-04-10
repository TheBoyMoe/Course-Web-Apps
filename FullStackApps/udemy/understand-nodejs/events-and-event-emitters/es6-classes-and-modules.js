'use strict';

const EventEmitter = require('events');

// example of an es6 class that's exported as a module
module.exports = class Greetr extends EventEmitter{
	constructor() {
		super(); // call to the parent's constructor, pass in parameters when req'd
		this.greeting = `Hello everyone, it's`;
	}
	
	// all methods are added to the prototype
	greet(data){
		console.log(`${this.greeting} ${data}`);
		this.emit('greet', data); // available on the EventEmitter's prototype
	}
};

// OR you can assign the class to a variable and export the variable