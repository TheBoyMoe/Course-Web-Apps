/*
	Export a object literal with the methods and properties you wish to make public
 */
"use strict";
let message = 'Hello from object literal';

const greet = ()=>{
	console.log(message);
};

// public methods
module.exports = {
	greet: greet
};