/*
    References:
    [1] http://mongoosejs.com/docs/validation.html (validation in mongoose)
    [2] https://www.npmjs.com/package/validator


 */
'use strict';
const mongoose = require('mongoose'); // don't need to import the config'd version for models
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// by defining a UserSchema we can define functions on the Schema and user objects
const UserSchema = new mongoose.Schema({
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

// instance methods - called on the user obj
UserSchema.methods.generateAuthToken = function () {
    const salt = 'qwerty';
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access}, salt).toString();
    
    // store the generated token in the user's tokens array
    user.tokens.push({
        access: access,
        token: token
    });
    
    // save the user to mongo, returning the token as the success
    // value for the next chained call - not returning a promise in this case
    return user.save().then(()=>{
        return token;
    })
    
};

// control what info is sent back with the jwt token - override the toJSON() method
UserSchema.methods.toJSON = function () {
    let user = this; // method is called on instances of user objects
    let userObject = user.toObject(); // only properties defined on the user model will be available
    return _.pick(userObject, ['_id', 'email']); // we don't want to return the token or the password - could be compromised
};




// schema methods


// user model, 'User' is used as the collection name
// validate emails using npm validator package
// - mongoose supports the use of custom validators, e.g 3rd party libs
const User = mongoose.model('User', UserSchema);

module.exports = {
	User
};
