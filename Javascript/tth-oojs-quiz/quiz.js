/* Keep track of the score and the current question
	- collection of questions
	- similar to playlist in media player app*/

function Quiz() {
	this.questions = [];
	this.currentQuestion = 0;
	this.currentScore = 0;
}

Quiz.prototype.next = function (container, progress, score) {
	this.currentQuestion++;
	if(this.currentQuestion === this.questions.length) {
		this.currentQuestion = 0;
		this.renderScore(progress, score);
		
	} else this.renderElement(container);
};


Quiz.prototype.renderElement = function (container) {
	container.innerHTML = this.questions[this.currentQuestion].toHTML();
};

Quiz.prototype.renderProgress = function (progress) {
	progress.innerHTML = `Question ${this.currentQuestion} out of ${this.questions.length}`;
};

Quiz.prototype.renderScore = function (progress, score) {
	progress.innerHTML = `You answered ${score} correctly`;
};
