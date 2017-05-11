'use strict';
const mongoose = require('mongoose');
const itemSchema = mongoose.Schema({
    name: String,
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;