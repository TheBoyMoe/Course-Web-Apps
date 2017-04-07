'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// answer schema
const AnswerSchema = new Schema({
	text: String,
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},
	votes: {type: Number, default: 0}
});

// question schema
const QuestionSchema = new Schema({
	text: String,
	createdAt: {type: Date, default: Date.now},
	answers: [AnswerSchema]
});

// create and export the Question model, questions collection is created automatically
const Question = mongoose.model('Question', QuestionSchema);
module.exports.Question = Question;