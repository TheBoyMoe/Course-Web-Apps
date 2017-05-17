'use strict';
const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/bcryptdemoapp');
mongoose.Promise = Promise;

module.exports.User = require('./user');