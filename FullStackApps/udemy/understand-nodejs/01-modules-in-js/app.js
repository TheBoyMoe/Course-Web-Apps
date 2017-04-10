/*
	Various ways to crete and use modules in js
 */

"use strict";

function callMe(fn){
	fn();
}

const localGreet = ()=>{
	console.log('Local hello everyone!');
};

callMe(localGreet);
console.log('-------------------');

// import separate/multiple functions from one file
const greet = require('./greet.js');
greet.one();
greet.two();

// import a module incorporating IIFE pattern
const uiCtrl = require('./ui-controller.js');
console.log(uiCtrl.sum(2,3));
console.log(uiCtrl.times(2,3));


// import multiple modules into one file - export that single file
const lang = require('./language');

lang.esp();
lang.eng();


// import a json file
const greetings = require('./greetings.json');

console.log(greetings.de);
console.log(greetings.pl);

// import modules from a folder with an index.js
const langs = require('./langs');
langs.eng();
langs.esp();