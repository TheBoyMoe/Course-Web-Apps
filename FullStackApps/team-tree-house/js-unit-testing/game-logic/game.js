'use strict';
const {fire} = require('./../game-logic/ship');

const checkGameStatus = ()=>{
	return false;
};

const takeTurn = (opposingPlayer, guessFunction)=>{
	let coordinates = guessFunction();
	fire(opposingPlayer, coordinates);
	let gameOver = checkGameStatus();
	
	return gameOver;
};

module.exports = {
	checkGameStatus,
	takeTurn
};