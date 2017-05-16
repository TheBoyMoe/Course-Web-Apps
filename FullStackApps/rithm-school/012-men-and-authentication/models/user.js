'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // in this particular app we're using the username to uniquely identify th user
    },
    password: {
        type: String,
        required: true
    }
});

// pre-hook method called prior to saving the user
// 'next' is a callback function that needs to be executed to
// ensure that we can move on to the next piece of middleware, otherwise the server will hang
userSchema.pre('save', function (next) {
    // cache the context of 'this'
    let user = this;
    // if the user's password has not been modified, don't hash it
    // this is when we're updating a user and they've not updated their password
    if(!user.isModified('password'))
        return next();
    
    bcrypt.hash(user.password, 10)
        .then((hashPassword)=>{
            user.password = hashPassword; // set the user's password to the hashed version prior to saving
            next();
        })
        .catch((err)=>next(err));
});


// instance method used to compare the entered plain text password to the saved hash
userSchema.methods.comparePassword = function (plaintext, next) {
    bcrypt.compare(plaintext, this.password, (err, isMatch)=>{
        if(err) return next(err);
        next(null, isMatch); // pass the result to the next function in the chain
    })
};

const User = mongoose.model('User', userSchema);
module.exports = User;