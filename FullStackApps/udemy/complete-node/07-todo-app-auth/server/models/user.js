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
