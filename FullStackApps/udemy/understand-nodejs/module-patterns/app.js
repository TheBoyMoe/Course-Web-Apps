// overwrite the exports with a function
const greet1 = require('./greet1');
greet1();

// EITHER add a proprty to exports and assign the function to that
const greet2 = require('./greet2');
greet2.greet();

console.log('--------------');

// OR
const greet = require('./greet2').greet;
greet();

console.log('--------------');

// overwrite exports with your own object
const greet3 = require('./greet3');
greet3.greet();

console.log('--------------');

greet3.greeting = 'Function constructor with a new message';
const greet3b = require('./greet3');
// prints new message - node uses a cached version of the module,
// does NOT create a new instance - this happens across files in your app
// you can call the same module multiple times, and the same cached version is used
greet3b.greet();

console.log('--------------');

// create new versions of the obj/module - when you don't want to use a cached version
const Greet4 = require('./greet4');
const greet4b = new Greet4(); // constructor function
greet4b.greet();

console.log('--------------');

const greet5 = require('./greet5');
greet5.greet();
