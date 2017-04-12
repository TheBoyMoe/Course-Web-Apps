/*
	References:
	[1] http://mochajs.org/
 */
"use strict";
const utils = require('./utils');

it('should add two numbers', ()=>{
	let result = utils.add(33, 11);
	if(result !== 44)
		throw new Error(`Expected 44, got ${result}`);
});

it('Should square a number', ()=>{
	let res = utils.square(2);
	if(res !== 4)
		throw new Error(`Expected 4, got ${res}`);
});