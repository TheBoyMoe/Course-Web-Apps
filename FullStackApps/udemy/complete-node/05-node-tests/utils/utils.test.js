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
 		
 	- when using 'describe' - wrap describe around it() statements as a means of grouping them
 	- using 'describe within an it() method does nothing
	
 */
"use strict";
const expect = require('expect');
const utils = require('./utils');


// use describe to group similar tests
describe('Utils', ()=>{
	
	describe('#add', ()=>{
		it('should add two numbers', ()=>{
			let result = utils.add(33, 11);
			expect(result).toBeA('number').toBe(44);
			
			// if(result !== 44)
			// 	throw new Error(`Expected 44, got ${result}`);
		});
		
		// check that the result passed into the callback is what is expected
		// 'done' keyword tells mocha this is an async test, and will wait for the callback to be executed
		it('Should async add two numbers', (done)=>{
			utils.asyncAdd(4,3, (sum)=>{
				expect(sum).toBeA('number').toBe(7);
				done(); // tells mocha to carryout the test
			});
		});
	});
	
	describe('#square', ()=>{
		it('Should square a number', ()=>{
			let result = utils.square(2);
			expect(result).toBeA('number').toBe(4);
			
			// if(res !== 4)
			// 	throw new Error(`Expected 4, got ${res}`);
		});
		
		it('Should async square of two numbers', (done)=>{
			utils.asyncSquare(2, (square)=>{
				expect(square).toBeA('number').toBe(4);
				done();
			});
		});
	});
	
});
	
	
it('Should expect some values', ()=>{
	
	let val = 12;
	expect(val).toNotBe(10);
	
	// can't use toBe/toNotBe with objects/arrays => uses the ==== (strict equality)
	let obj1 = {name: 'Tom', age: 45}, obj2 = {name: 'Tom', age: 45}, obj3 = {name: 'Peter', age: 45};
	let arr1 = [1,2,3,4,5], arr2 = [1,2,3,4,5];
	// expect(obj1).toBe(obj2); // fails - compares obj references
	
	expect(obj1).toNotBe(obj2); // passes
	
	// to compare objects use toEqual/toNotEqual - looks at obj properties
	expect(obj1).toEqual(obj2); // passes
	
	// expect(obj1).toEqual(obj3); // fails
	
	expect(obj1).toNotEqual(obj3); // passes
	
	expect(arr1).toEqual(arr2); // passes

	// to check if an array includes certain items/an object includes certain properties
	expect(arr1).toInclude(5); // passes
	// expect(arr1).toExclude(3); // fails
	
	expect(arr1).toExclude(6); // passes
	// expect(obj1).toInclude({age: 34}); // fails
	
	expect(obj1).toInclude({name: 'Tom'}) // passes
	
});

it('Should set firstname and lastname', ()=>{
	const person = utils.setName({age: 45, location: 'London'}, 'Peter Jones');
	const obj = {age: 45, location: 'London', firstname: 'Peter', lastname: 'Jones'};
	
	expect(person).toInclude({firstname: 'Peter', lastname: 'Jones'});
	expect(person).toEqual(obj);
	expect(person).toBeA('object');
});

