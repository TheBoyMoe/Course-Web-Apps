/* Instructor Schema */
const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    isHilarious: {type: Boolean, default: true},
    favoriteColors: [String],
    createdAt: {type: Date, default: Date.now}
});

const Instructor = mongoose.model('Instructor', instructorSchema);
module.exports = Instructor;