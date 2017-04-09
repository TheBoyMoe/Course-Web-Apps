/*
	Same example as in app2.js, except we're also passing in an argument
 */
'use strict';

const EventEmitter = require('events');
const util = require('util');

// create the function constructor that will do the inheriting
function Greetr() {
	this.greeting = `Hello everyone, it's`;
}

util.inherits(Greetr, EventEmitter);

// add your own custom methods to Greetr's prototype - passing in a parameter
Greetr.prototype.greet = function (data) {
	console.log(`${this.greeting} ${data}`);
	this.emit('greet', data); // available on the EventEmitter's prototype
};


let greet1 = new Greetr();
greet1.on('greet', (data)=>{
	console.log(`${data} said hello`); // callback function placed in the event array
});

greet1.greet('Tom');