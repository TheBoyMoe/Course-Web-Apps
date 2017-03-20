function Question(question, choices, answer) {
	this.question = question;
	this.choices = answers;
	this.answer = answer;
}


Question.prototype.isCorrectAnswer = function (choice) {
	return this.answer === choice;
};
