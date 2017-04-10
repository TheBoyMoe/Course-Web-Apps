"use strict";

function greet1() {
	console.log('Greet 1............');
}

function greet2(){
	console.log('Greet 2...........')
	greet3();
}

// private as it's not been exported
function greet3() {
	console.log('Greet 3.......');
}

/* EITHER
module.exports.greetOne = greet1;
module.exports.greetTwo = greet2;
*/

// OR
module.exports = {
	one: greet1,
	two: greet2
};