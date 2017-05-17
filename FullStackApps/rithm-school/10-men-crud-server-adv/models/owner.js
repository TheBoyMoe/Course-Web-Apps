'use strict';
const mongoose = require('mongoose');
const ownerSchema = new mongoose.Schema({
    name: String,
    // create a reference to the Pet model, since it's an array we're
    // telling mongo to create a one-to-many relationship
    pets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet' // reference the Pet model
    }]
});

const Owner = mongoose.model('Owner', ownerSchema);
module.exports = Owner;