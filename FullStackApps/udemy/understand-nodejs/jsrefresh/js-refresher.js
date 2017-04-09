/*
	in js functions are first-class - can be treated as values
 */

"use strict";
const greet = require('./greet.js');
const uiCtrl = require('./ui-controller.js');

function callMe(fn){
	fn();
}

const localGreet = ()=>{
	console.log('Local hello everyone!');
};

callMe(localGreet);
console.log('-------------------');
greet.greetOne();
greet.greetTwo();
console.log(uiCtrl.sum(2,3));
console.log(uiCtrl.times(2,3));

// more on modules
const lang = require('./language');

lang.esp();
lang.eng();