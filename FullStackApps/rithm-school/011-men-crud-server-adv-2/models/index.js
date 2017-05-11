'use strict';
const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/usersandshoppinglist');
mongoose.Promise = Promise;

module.exports.User = require('./user');
module.exports.Item = require('./item');
