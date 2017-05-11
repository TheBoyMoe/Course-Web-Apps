const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/petsapp');
mongoose.Promise = promise;

module.exports.Pet = require('./pet');