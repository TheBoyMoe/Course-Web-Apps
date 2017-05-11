const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/petsapp');
mongoose.Promise = Promise;

module.exports.Pet = require('./pet');