'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	name: {
		type: String,
		required: true,
		trim: true
	},
	favoriteBook: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	}
});

// hash the password prior to saving ot the database
UserSchema.pre('save', function (next) {
	let user = this; // this refers to the user obj created
	bcrypt.hash(user.password, 10, (err, hash)=>{ // 2nd arg refers to the number of times bcrypt hashes the password
		if(err) return next(err); // handled by error handler in app.js
		
		user.password = hash;
		next(); // call the next method in the middleware stack
	});
});

// create the User model and export
const User = mongoose.model('User', UserSchema);
module.exports = User;