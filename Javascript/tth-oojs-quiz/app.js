/* Creates the quiz and displays the first question */

let questions = [
	new Question('Who was the first President of the United States?',
				['George Washington', 'Thomas Jefferson'], 'George Washington'),
	new Question('What is the answer to the Ultimate Question of Life, the Universe and Everything?',
				['Pi', '42'], '42')
];

let quiz = new Quiz(questions);

// display quiz
QuizUI.displayNext();