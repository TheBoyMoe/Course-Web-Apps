'use strict';
const {expect} = require('chai');
const {validateLocation, validateLocations, placeShip} = require('./../game-logic/player');

describe('PLAYER METHODS', function () {
	describe('validateLocation', function () {
		let player;
		beforeEach(function () {
			player = {
				ships: [
					{
						locations: [[9, 9]]
					}
				]
			};
		});
		
		it('should confirm valid for unoccupied locations in range', function () {
			let location = [0, 0];
			let actual = validateLocation(player, location);
			
			expect(actual).to.be.ok;
		});
		
		it('should confirm Invalid for occupied locations in range', function () {
			let location = [9, 9];
			let actual = validateLocation(player, location);
			
			expect(actual).to.be.false;
		});
		
		it('should confirm Invalid for Unoccupied locations OUT of range', function () {
			let locationHigh = [10, 10];
			let locationLow = [-1, -1];
			
			expect(validateLocation(player, locationHigh)).to.be.false;
			expect(validateLocation(player, locationLow)).to.be.false;
		});
	});
	
	describe('validateLocations', function () {
		let player;
		beforeEach(function () {
			player = {
				ships: [
					{
						locations: [[0, 0]]
					}
				]
			};
		});
		
		it('should correctly report a list of unoccupied locations is valid', function () {
			let locations = [[1, 1], [1, 2], [1, 3], [1, 4]];
			expect(validateLocations(player, locations)).to.be.ok;
		});
		
		it('should correctly report a a problem if any location in the list is invalid', function () {
			let locations = [[1, 1], [1, 2], [1, 3], [10, 10]];
			expect(validateLocations(player, locations)).to.be.false;
			
			locations = [[1, 1], [1, 2], [1, 3], [0, 0]];
			expect(validateLocations(player, locations)).to.be.false;
		});
	});
	
	describe('placeShip', function () {
		let player;
		beforeEach(function () {
			player = {
				ships: [
					{
						size: 1,
						locations: []
					},
					{
						size: 2,
						locations: [[1, 0], [1, 1]]
					}
				]
			};
		});
		
		it('should update a ship with a valid starting location', function () {
			let ship = player.ships[0];
			let coordinates = [0, 1];
			
			placeShip(player, ship, coordinates, 'horizontal');
			let actual = ship.locations;
			
			expect(actual).to.be.ok;
			expect(actual).to.have.length(1);
			expect(actual[0]).to.deep.equal([0, 1]);
		});
		
		it('should throw an error if no direction is specified', ()=>{
			let ship = player.ships[0];
			let coordinates = [0,1];
			let handler = ()=>{
				placeShip(player, ship, coordinates);
			};
			expect(handler).to.throw(Error); // checks that an error is thrown
			expect(handler).to.throw('Direction required'); // check the error message shown
		});
		
		
	});
	
});