"use strict";
const request = require('supertest');
const app = require('./server').app;

// test the '/' request
it('Should return hello world response', (done)=>{
	request(app)
		.get('/')
		.expect(404)
		.expect((res)=>{
			 expect(res.body).toInclude({
				 error: 'Page not found'
			 });
		})
		.end(done);
});
