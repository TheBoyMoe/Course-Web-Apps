'use strict';
const mocha = require('mocha');
const {expect} = require('chai');

const {checkForShip, checkForDamage, fire} = require('../game-logic/ship');

describe('check for ship', ()=>{
	let player;
	
	// executed once before the suite runs
	before(()=>{
		player = {
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
	});
	
	
	it('should correctly report no ship at a given players coordinate', ()=>{
		// check if the player has a ship at that location
		expect(checkForShip(player, [5,5])).to.be.false;
	});
	
	it('should correctly report a ship at the given coordinates', ()=>{
		expect(checkForShip(player, [0,0])).to.deep.equal(player.ships[0]);
	});
	
	it('should handle ships located at more than one coordinate', ()=>{
		expect(checkForShip(player, [0,1])).to.deep.equal(player.ships[0]);
		expect(checkForShip(player, [0,0])).to.deep.equal(player.ships[0]);
		expect(checkForShip(player, [9,9])).to.be.false;
	});
	
	it('should handle checking multiple ships', ()=>{
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
		let ship = {
			locations: [[0,0]],
			damage: []
		};
		checkForDamage(ship, [0,0]);
		
		expect(ship.damage).to.not.be.empty;
		expect(ship.damage[0]).to.deep.equal([0,0]);
	});
	
});

describe('fire', ()=>{
	
	let player;
	// executed before each test runs - the function has side effects, altering the state of the app outside the function
	// objects such as these will be overwritten the next time the function is called.
	// no need in this case for after() or afterEach() - use to 'teardown' databases and servers
	beforeEach(()=>{
		player = {
			ships: [
				{
					locations: [[0,0]],
					damage: []
				}
			]
		};
	});
	
	after(()=>{
		console.log('Entire test suite completed');
	});
	
	afterEach(()=>{
		console.log('one unit test completed');
	});
	
	it('should record damage on the given players ship at a given coordinate', ()=>{
		fire( player, [0,0]);
		expect(player.ships[0].damage[0]).to.deep.equal([0,0]);
	});
	
	it('should not record damage if there is no ship at my coordinates', ()=>{
		fire( player, [9,9]);
		expect(player.ships[0].damage).to.be.empty;
	});
});