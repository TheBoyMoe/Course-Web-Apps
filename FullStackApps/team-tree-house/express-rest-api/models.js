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

// instance method for updating answers
AnswerSchema.method('update', function (updates, callback) {
	Object.assign(this, updates, {updatedAt: new Date()});
	this.parent().save(callback);
});

// instance method for updating vote
AnswerSchema.method('vote', function (vote, callback) {
	(vote === 'up')? this.vote += 1: this.vote -= 1;
});

// question schema
const QuestionSchema = new Schema({
	text: String,
	createdAt: {type: Date, default: Date.now},
	answers: [AnswerSchema]
});

const sortAnswers = (a,b)=>{
	// - negative a before b
	// 0 no change
	// + positive a after b
	if(a.votes === b.votes){
		// orders the larger or later dates first
		return b.updatedAt - a.updatedAt; // time in milliseconds
	}
	// orders larger votes first
	return b.votes - a.votes;
};

// use a pre-hook on the save event to sort the answers every time they're saved
QuestionSchema.pre('save', function (next) {
	this.answers.sort(sortAnswers);
	next();
});





// create and export the Question model, questions collection is created automatically
const Question = mongoose.model('Question', QuestionSchema);
module.exports.Question = Question;