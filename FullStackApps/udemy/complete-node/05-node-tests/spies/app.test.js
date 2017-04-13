"use strict";
const expect = require('expect');
const rewire = require('rewire'); // allows you to swap out functions and set the spies instead

const app = rewire('./app');

describe('App', ()=>{
	
	let db = {
		saveUser: expect.createSpy()
	};
	app.__set__('db', db);
	
	it('Should call the spy correctly', ()=>{
		// create spy - use spies to simulate functions, e.g saveUser() - check that the function was called(with/without args)
		const spy = expect.createSpy();
		spy('Tom Jones', 45);
		expect(spy).toHaveBeenCalledWith('Tom Jones', 45); // spy was called with arguments
	});
	
	it('Should call saveUser with user object', ()=>{
		let email = 'user@example.com';
		let password = 'qwerty';
		
		app.handleSignup(email, password); // function being tested
		expect(db.saveUser).toHaveBeenCalledWith(
			{
				email: email,
				password: password
			}
		);
	});
	
});