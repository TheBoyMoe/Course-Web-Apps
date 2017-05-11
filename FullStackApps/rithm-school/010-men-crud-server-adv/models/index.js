'use strict';
const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/ownersandpetsapp');
mongoose.Promise = Promise;

module.exports.Owner = require('./owner');
module.exports.Pet = require('./pet');
