'use strict';
const mongoose = require('mongoose');
const petSchema = new mongoose.Schema({
    name: String,
    // add reference to the Owner model - one-to-one relationship
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner'
    }
});

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;