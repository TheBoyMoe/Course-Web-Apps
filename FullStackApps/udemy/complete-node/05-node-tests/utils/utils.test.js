/*
	References:
	[1] http://mochajs.org/
	[2] https://github.com/mjackson/expect (assertion framework)
	[3] http://chaijs.com/ (assertion framework)
	
	
	Note:
	- to automatically run all your tests when ever a file changes
		$ nodemon --exec 'npm test'
	
	- to automate testing with npm, add the following line to the scripts section of package.json
 		"test-watch": "nodemon --exec \"npm test\""
 	- to run the tests, from the cli enter
 		$ npm run test-watch
	
 */
"use strict";
const expect = require('expect');
const utils = require('./utils');

it('should add two numbers', ()=>{
	let result = utils.add(33, 11);
	expect(result).toBeA('number').toBe(44);
	
	// if(result !== 44)
	// 	throw new Error(`Expected 44, got ${result}`);
});

it('Should square a number', ()=>{
	let result = utils.square(2);
	expect(result).toBeA('number').toBe(4);
	
	// if(res !== 4)
	// 	throw new Error(`Expected 4, got ${res}`);
});