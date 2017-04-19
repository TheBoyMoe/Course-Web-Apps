'use strict';
const {expect} = require('chai');
const {checkGameStatus, takeTurn} = require('./../game-logic/game');

describe('Game instance functions', ()=>{
	
	describe('check game status', ()=>{
		it('should tell me when the game is over', ()=>{
			let players = [
				{
					ships: [
						{
							locations: [[0,0]],
							damage: [[0,0]]
						}
					]
				}
			];
			
			let actual = checkGameStatus(players);
			expect(actual).to.be.false;
		})
		
	});
	
	
	// simulate stub/mocks
	describe('take turn', ()=>{
		let guess, player ;
		
		beforeEach(()=>{
			guess = ()=>{
				return [0,0];
			};
			player = {
				ships: [
					{
						locations: [[0,0]],
						damage: []
					}
				]
			}
		});
		
		it('should return false if the game ends', ()=>{
			let actual = takeTurn(player, guess);
			expect(actual).to.be.false;
		});
		
	});
	
	
	// simulate asynchronous function - call to database
	const saveGame = (callback)=>{
		setTimeout(()=>{
			callback(); // simulates replay from database to confirm record saved
		}, 1000);
	};
	
	describe('save game', ()=>{
		it('should update save status', (done)=>{ // tells mocha code is asynchronous
			let status = 'game not saved...';
			saveGame(()=>{
				status = 'game saved';
				expect(status).to.equal('game saved');
				done();
			});
		});
	});
	
	
	describe('set an individual spec to pending', ()=>{
		it('should tell me when the game is over'); // pending
	});
	
	xdescribe('check game is over', ()=>{ // marks all specs as pending
		it('should tell me when the game is running!', ()=>{
		
		});
	});
	
});