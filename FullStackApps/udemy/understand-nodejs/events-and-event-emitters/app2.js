//Example of creating objects that inherit from node's Event Emitter obj
// makes use of node's util module
'use strict';

const EventEmitter = require('events');
const util = require('util');

// create the function constructor that will do the inheriting
function Greetr() {
	EventEmitter.call(this);
	this.greeting = 'Hello everyone!';
}

// similar to the Object.create() pattern, Greetr inherits props and methods from EventEmitter
util.inherits(Greetr, EventEmitter);

// add your own custom methods to Greetr's prototype
Greetr.prototype.greet = function () {
	console.log(this.greeting);
	this.emit('greet'); // available on the EventEmitter's prototype
};

// create an instance of the object and add a listener for the 'greet' event
let greet1 = new Greetr();
greet1.on('greet', ()=>{
	console.log('someone said hello!'); // callback function placed in the event array
});

greet1.greet();