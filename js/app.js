/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
document.addEventListener('DOMContentLoaded', function () {

	let scores, roundScore, activePlayer;
	let dice = document.querySelector('.dice');
	let score0 = document.getElementById('score-0');
	let score1 = document.getElementById('score-1');
	let current0 = document.getElementById('current-0');
	let current1 = document.getElementById('current-1');
	
	// init the app
	score0.textContent = score1.textContent = current0.textContent = current1.textContent = '0';
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	
	dice.style.display = 'none'; // hide the dice until it's rolled

	// add event listener to the roll dice btn
	document.querySelector('.btn-roll').addEventListener('click', rollDice);
	function rollDice(e) {
		// 1. roll the dice and display the result
		let rolled = Math.floor(Math.random() * 6) + 1;
		dice.src = `./imgs/dice-${rolled}.png`; // update the dice img to reflect num rolled
		dice.style.display = 'block'; // display the dice
		
		// 2. update the roundScore if the num rolled is greater than 1
		// and update the player's current score
		if(rolled !== 1) {
			roundScore += rolled;
			//activePlayerScore.textContent = roundScore;
		} else {
			// reset the players current score and switch to the other player
			roundScore = 0;
			activePlayer = (activePlayer === 0)? 1 : 0;
			
			// reset the current scores & update ui
			current0.textContent = current1.textContent = '0';
			document.querySelector('.player-0-panel').classList.toggle('active');
			document.querySelector('.player-1-panel').classList.toggle('active');
			dice.style.display = 'none';
		}
		document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
	}
	
});
