/* config Mongoose */
const mongoose = require('mongoose');
mongoose.set('debug', true); // log mongo queries
mongoose.connect('mongodb://localhost/mongoosedemo');
mongoose.Promise = global.Promise; // use ES2015 promises instead of callbacks

module.exports.Instructor = require('./instructor');