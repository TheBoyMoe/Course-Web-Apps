/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
document.addEventListener('DOMContentLoaded', function () {
	console.log('Page loaded');

	let scores, roundScore, activePlayer;
	let dice = document.querySelector('.dice');
	
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	
	dice.style.display = 'none'; // hide the dice until it's rolled

	// add event listener to the roll dice btn
	document.querySelector('.btn-roll').addEventListener('click', rollDice);
	function rollDice(e) {
		dice.style.display = 'block'; // display the dice
		// roll the dice and display the result
		let rolled = Math.floor(Math.random() * 6) + 1;
		dice.src = `./imgs/dice-${rolled}.png`; // update the dice img to reflect num rolled
		
		// update the activePlayer's current score when the dice is rolled
		document.querySelector(`#current-${activePlayer}`).textContent = rolled;
	}
	
});
