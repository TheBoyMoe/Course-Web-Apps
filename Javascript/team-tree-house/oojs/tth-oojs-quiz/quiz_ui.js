/* handles all the updates to the ui
 	- cache references to all the elements of importance */

let QuizUI = {
	displayNext: function () {
		if(quiz.hasEnded()){
			this.displayScore();
		} else {
			this.displayQuestion();
			this.displayChoices();
			this.displayProgress();
		}
	},
	displayQuestion: function () {
		this.populateElementWithHTML('question', quiz.getCurrentQuestion().question);
	},
	displayChoices: function () {
		let choices = quiz.getCurrentQuestion().choices;
		for(let i = 0; i < choices.length; i++){
			this.populateElementWithHTML('choice' + i, choices[i]);
			this.guessHandler('guess' + i, choices[i]);
		}
	},
	displayScore: function () {
		let gameOverHTML = '<h1>Game Over</h1>';
		gameOverHTML += '<h2>Your score is ' + quiz.score + '</h2>';
		this.populateElementWithHTML('quiz', gameOverHTML);
	},
	displayProgress: function () {
		let currentQuestionNumber = quiz.currentQuestionIndex + 1;
		this.populateElementWithHTML('progress', 'Question ' + currentQuestionNumber + ' of ' + quiz.questions.length);
	},
	populateElementWithHTML: function (id, text) {
		let element = document.getElementById(id);
		element.innerHTML = text;
	},
	guessHandler: function (id, guess) {
		let button = document.getElementById(id);
		button.onclick = function () {
			quiz.guess(guess);
			QuizUI.displayNext();
		}
	}
	
};
	
