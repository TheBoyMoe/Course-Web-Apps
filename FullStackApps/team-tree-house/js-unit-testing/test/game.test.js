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
	
	
	
	
	describe('set an individual spec to pending', ()=>{
		it('should tell me when the game is over'); // pending
	});
	
	xdescribe('check game is over', ()=>{ // marks all specs as pending
		it('should tell me when the game is running!', ()=>{
		
		});
	});
	
});