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

// authenticate user against their saved user info
// - statics object allows you to add methods directly to the model
// email & password args are from user input - call method in POST /login route
UserSchema.statics.authenticate = (email, password, callback)=>{
	// find user with matching email
	User.findOne({email: email})
		.exec((err, user)=>{
			if(err) return callback(err);
			else if(!user){
				let error = new Error('User not found');
				error.status = 401;
				return callback(error);
			}
			// user found, compare passwords
			bcrypt.compare(password, user.password, (err, result)=>{
				if(result === true) return callback(null, user); // callback pattern callback(err, result)
				else return callback(); // user undefined
			})
		})
};

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