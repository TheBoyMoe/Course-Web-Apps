'use strict';
const mocha = require('mocha');
const {expect} = require('chai');

const {checkForShip, checkForDamage, fire} = require('../game-logic/ship');

describe('check for ship', ()=>{
	it('should correctly report no ship at a given players coordinate', ()=>{
		let player = {
			// player has only one ship in this example
			ships: [
				{
					locations: [[0,0]]
				}
			]
		};
		
		// check if the player has a ship at that location
		expect(checkForShip(player, [5,5])).to.be.false;
	});
	
	it('should correctly report a ship at the given coordinates', ()=>{
		let player = {
			ships: [
				{
					locations: [[5,5]]
				}
			]
		};
		expect(checkForShip(player, [5,5])).to.deep.equal(player.ships[0]);
	});
	
	it('should handle ships located at more than one coordinate', ()=>{
		let player = {
			ships: [
				{
					locations: [[0, 0], [0,1]]
				}
			]
		};
		expect(checkForShip(player, [0,1])).to.deep.equal(player.ships[0]);
		expect(checkForShip(player, [0,0])).to.deep.equal(player.ships[0]);
		expect(checkForShip(player, [9,9])).to.be.false;
	});
	
	it('should handle checking multiple ships', ()=>{
		let player = {
			ships: [
				{
					locations: [[0, 0], [0,1]]
				},
				{
					locations: [[1,0], [1,1]]
				},
				{
					locations: [[2,0], [2,1], [2,2], [2,3]]
				}
			]
		};
		expect(checkForShip(player, [0,1])).to.deep.equal(player.ships[0]);
		expect(checkForShip(player, [0,0])).to.deep.equal(player.ships[0]);
		expect(checkForShip(player, [1,0])).to.deep.equal(player.ships[1]);
		expect(checkForShip(player, [1,1])).to.deep.equal(player.ships[1]);
		expect(checkForShip(player, [2,3])).to.deep.equal(player.ships[2]);
		expect(checkForShip(player, [9,9])).to.be.false;
	});
	
});


describe('check for damage', ()=>{
	it('should register damage on a given ship at a given location', ()=>{
		// dummy data
		let ship = {
			locations: [[0,0]],
			damage: []
		};
		checkForDamage(ship, [0,0]);
		
		expect(ship.damage).to.not.be.empty;
		expect(ship.damage[0]).to.deep.equal([0,0]);
	})
});

describe('fire', ()=>{
	it('should record damage on the given players ship at a given coordinate', ()=>{
		let player = {
			ships: [
				{
					locations: [[0,0]],
					damage: []
				}
			]
		};
		fire( player, [0,0]);
		
		expect(player.ships[0].damage[0]).to.deep.equal([0,0]);
	});
	
	it('should not record damage if there is no ship at my coordinates', ()=>{
		let player = {
			ships: [
				{
					locations: [[0,0]],
					damage: []
				}
			]
		};
		fire( player, [9,9]);
		
		expect(player.ships[0].damage).to.be.empty;
	});
});