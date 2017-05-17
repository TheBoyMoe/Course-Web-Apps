'use strict';
const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/passportLocalDemo');
mongoose.Promise = Promise;
mongoose.connection.on('error', (err) => console.error(err.message));

module.exports.User = require('./user');