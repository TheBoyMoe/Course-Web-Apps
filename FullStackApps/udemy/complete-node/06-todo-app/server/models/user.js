'use strict';
const mongoose = require('mongoose'); // don't need to import the config'd version for models

// user model, 'User' is used as the collection name
const User = mongoose.model('User', {
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	}
});

module.exports = {
	User
};

// create the new user and save them to the database
// let newUser = new User({
// 	name: 'Tom Jones',
// 	email: 'tom@jonesfamily.com'
// });
// newUser.save().then((doc)=>{
// 	console.log('Success: ', doc);
// }, (err)=>{
// 	console.error('Unable to save Todo: ', err);
// });