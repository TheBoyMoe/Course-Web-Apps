'use strict';

const checkForShip = (player, coordinates)=>{
	let shipPresent = false, ship;
	for(let i = 0; i < player.ships.length; i++){
		ship = player.ships[i];
		shipPresent = ship.locations.filter((coords)=> {
			return (coords[0] === coordinates[0]) && (coords[1] === coordinates[1])
		})[0]; // filter returns an array
		if(shipPresent)
			return true;
	}
	return false;
};

module.exports = {
	checkForShip
};