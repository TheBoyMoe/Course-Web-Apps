"use strict";
let db = require('./db'); // tests fail if this is a const, since were swapping it out

const handleSignup = (email, password)=>{
	
	// check if email already exists
	
	// save the user to the database
	db.saveUser({
		email: email,
		password: password
	});
	// send the welcome email
	
};

module.exports.handleSignup = handleSignup;