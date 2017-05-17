'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    
    bcrypt.hash(user.password, 10)
        .then((hash)=>{
            user.password = hash;
            next();
        }, (err) => next(err));
});


userSchema.methods.comparePassword = function(enteredPassword, next){
    bcrypt.compare(enteredPassword, this.password, (err, isMatch)=>{
        if(err) return next(err);
        next(null, isMatch);
    })
};

const User = mongoose.model('User', userSchema);
module.exports = User;