"use strict";
const request = require('supertest');
const expect = require('expect');
const app = require('./server').app;

// test the '/' request
it('Should return hello world response', (done)=>{
	request(app)
		.get('/')
		.expect(404) // your testing the response sent back to the client
		.expect((res)=>{
			expect(res.body).toInclude({ // using expect assertion lib
				error: 'Page not found'
			});
		})
		.end(done);
});

// TEST that the array includes a particular user
it('Should return an array of user objects', (done)=>{
	request(app)
		.get('/users')
		.expect(200) // check the status code
		.expect((res)=>{
			expect(res.body).toInclude(
				{
					name: 'Grace Jones',
					age: 54
				}
			)
		})
		.end(done);
});


// TEST the array contents match
// it('Should return an array of user objects', (done)=>{
// 	request(app)
// 		.get('/users')
// 		.expect(200)
// 		.expect((res)=>{
// 			expect(res.body).toEqual([
// 				{
// 					name: 'Tom Jones',
// 					age: 34
// 				},
// 				{
// 					name: 'Peter Jones',
// 					age: 43
// 				},
// 				{
// 					name: 'Grace Jones',
// 					age: 54
// 				}])
// 		})
// 		.end(done);
// });
