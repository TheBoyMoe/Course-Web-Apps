'use strict';
const mocha = require('mocha');
const {expect} = require('chai');

const {checkForShip} = require('../game-logic/ship');

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
		expect(checkForShip(player, [5,5])).to.be.true;
	});
	
	it('should handle ships located at more than one coordinate', ()=>{
		let player = {
			ships: [
				{
					locations: [[0, 0], [0,1]]
				}
			]
		};
		expect(checkForShip(player, [0,1])).to.be.true;
		expect(checkForShip(player, [0,0])).to.be.true;
		expect(checkForShip(player, [9,9])).to.be.false;
	});
	
	it('should handle checking multiple ships', ()=>{
		let player = {
			ships: [
				{
					locations: [[0, 0], [0,1]]
				},
				{
					locations:[[1,0], [1,1]]
				}
			]
		};
		expect(checkForShip(player, [0,1])).to.be.true;
		expect(checkForShip(player, [0,0])).to.be.true;
		expect(checkForShip(player, [1,0])).to.be.true;
		expect(checkForShip(player, [1,1])).to.be.true;
		expect(checkForShip(player, [9,9])).to.be.false;
	});
	
});