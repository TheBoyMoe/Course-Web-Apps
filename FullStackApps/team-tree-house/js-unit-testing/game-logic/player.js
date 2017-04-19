'use strict';
const {checkForShip} = require('./ship');

function validateLocation (player, coordinates) {
	let x = coordinates[0];
	let y = coordinates[1];
	
	let spaceAvailable = !checkForShip(player, coordinates);
	
	if ((x <= 9 && x >= 0) && (y <= 9 && y >= 0)) {
		return spaceAvailable; // decides whether this valid space is occupied
	} else {
		return false;
	}
}

function validateLocations (player, locations) {
	let validated = locations.map(function (location) {
		return validateLocation(player, location);
	});
	return validated.indexOf(false) === -1;
}

function placeShip (player, ship, startingCoordinates, direction) {
	if(!direction) throw Error('Direction required');
	
	let proposedLocations = [];
	let previousLocation,
		rowNumber,
		columnNumber;
	
	for(let i = 0; i < ship.size; i++) {
		previousLocation = proposedLocations[i - 1] || [];
		rowNumber = previousLocation[0];
		columnNumber = previousLocation[1];
		
		proposedLocations[i] = (i === 0)
			? startingCoordinates
			: (direction === 'horizontal')
				? [rowNumber, ++columnNumber]
				: [++rowNumber, columnNumber];
	}
	
	if (validateLocations(player, proposedLocations)) {
		ship.locations = proposedLocations;
	} else {
		return false;
	}
}

/*
	computerFire and computerPlace ship are difficult to test because each carries out 2 steps
	generate random coordinates and execute the fire or place ship method
	 - tight coupling in methods like these make them difficult to test
	 - when they are tested the results are often meaningless as a result of the random nature of the input

 */

// OLD VERSION
// function computerFire (player) {
// 	let x = Math.floor(Math.random() * 9);
// 	let y = Math.floor(Math.random() * 9);
// 	let coordinates = [x, y];
//
// 	fire(player, coordinates);
// }
//
// function computerPlaceShip (player, ship) {
// 	let direction = (Math.random() > 0.5)? 'horizontal': 'vertical';
// 	let x = Math.floor(Math.random() * 9);
// 	let y = Math.floor(Math.random() * 9);
// 	let coordinates = [x, y];
// 	placeShip(player, ship, coordinates, direction);
// }


// NEW VERSION
const getRandomCoordinates = ()=>{
	let x = Math.floor(Math.random() * 9);
	let y = Math.floor(Math.random() * 9);
	return [x, y];
};

const getRandomDirection = ()=>{
	return (Math.random() > 0.5)? 'horizontal': 'vertical';
};

//fire(player, getRandomCoordinates());
//placeShip(player, ship, getRandomCoordinates(), getRandomDirection());


module.exports = {
	placeShip,
	validateLocations,
	validateLocation
};