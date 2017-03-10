/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
document.addEventListener('DOMContentLoaded', function () {

	let scores, currentTotal, activePlayer;
	let dice = document.querySelector('.dice');
	let current0 = document.getElementById('current-0');
	let current1 = document.getElementById('current-1');
	let panel0 = document.querySelector('.player-0-panel');
	let panel1 = document.querySelector('.player-1-panel');
	
	
	init();

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
			currentTotal += rolled;
		} else {
			nextPlayer();
		}
		document.querySelector(`#current-${activePlayer}`).textContent = '' + currentTotal;
	}
	
	// add an event listener to the hold btn
	document.querySelector('.btn-hold').addEventListener('click', hold);
	function hold(e) {
		// save current score to the player's global score
		scores[activePlayer] += currentTotal;
		
		// display the player's global score
		document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
		
		// check if the player has won the game, otherwise switch players
		if(scores[activePlayer] > 20) {
			// player has won
			document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
			dice.style.display = 'none';
			document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
			document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
		} else {
			nextPlayer();
		}
	}

	// start a new game
	document.querySelector('.btn-new').addEventListener('click', init);
	
	function nextPlayer() {
		// reset the players current score and switch to the other player
		currentTotal = 0;
		activePlayer = (activePlayer === 0)? 1 : 0;
		
		// reset the current scores & update ui
		current0.textContent = current1.textContent = '0';
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		dice.style.display = 'none';
	}

	function init() {
		// initialize the app
		scores = [0,0];
		currentTotal = 0;
		activePlayer = 0;
		
		dice.style.display = 'none'; // hide the dice until it's rolled
		
		// set the starting ui
		current0.textContent = current1.textContent = '0';
		panel0.classList.remove(['winner'], ['active']);
		panel1.classList.remove(['winner'], ['active']);
		panel0.classList.add('active');
		document.getElementById('score-0').textContent = '0';
		document.getElementById('score-1').textContent = '0';
		document.getElementById('name-0').textContent = 'Player 1';
		document.getElementById('name-1').textContent = 'Player 2';
		
	}
	

});


