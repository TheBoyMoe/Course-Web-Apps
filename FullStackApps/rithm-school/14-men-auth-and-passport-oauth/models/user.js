'use strict';
const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    facebook_id: {
        type: String,
        required: true
    }
});

userSchema.plugin(findOrCreate); // adds a findOrCreate method
const User = mongoose.model('User', userSchema);
module.exports = User;