/*
    References:
    [1] http://mongoosejs.com/docs/validation.html (validation in mongoose)
    [2] https://www.npmjs.com/package/validator


 */
'use strict';
const mongoose = require('mongoose'); // don't need to import the config'd version for models
const validator = require('validator');

// user model, 'User' is used as the collection name
// validate emails using npm validator package
// - mongoose supports the use of custom validators, e.g 3rd party libs
const User = mongoose.model('User', {
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
        unique: true,
        validate: {
		    validator: function (value) {
                return validator.isEmail(value);
            },
            message: '{VALUE} is not a valid email'
        }
	},
    password: {
	    type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
	    access: {
	        type: String,
            required: true
        },
        token: {
	        type: String,
            required: true
        }
    }]
});

module.exports = {
	User
};
