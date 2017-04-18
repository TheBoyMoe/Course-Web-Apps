'use strict';

const checkForShip = (player, coordinates)=>{
	let shipPresent = false, ship;
	for(let i = 0; i < player.ships.length; i++){
		ship = player.ships[i];
		shipPresent = ship.locations.filter((coords)=> {
			return (coords[0] === coordinates[0]) && (coords[1] === coordinates[1])
		})[0]; // filter returns an array
		if(shipPresent)
			return ship;
	}
	return false;
};

const checkForDamage = (ship, coords)=>{
	ship.damage.push(coords);
};

const fire = (player, coords)=>{
	let ship = checkForShip(player, coords);
	if(ship)
		checkForDamage(ship, coords);
};


module.exports = {
	checkForShip,
	checkForDamage,
	fire
};