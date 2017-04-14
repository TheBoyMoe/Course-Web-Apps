"use strict";
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// clear the db before every test case is run
beforeEach((done)=>{
	Todo.remove({}).then(() => done());
});

describe('POST /todos', ()=>{
	
	it('Should create a new todo', (done)=>{
		// 1. check that we send back to the client correct text and status code
		let text = 'Test todo text';
		request(app)
			.post('/todos')
			.send({text: text})
			.expect(200)
			.expect((res)=>{
				expect(res.body.text).toBe(text);
			})
			.end((err, res)=>{
				if(err) return done(err);
				
				// 2. check that the item was added to the dbase
				Todo.find().then((todos)=>{
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch((e) => done(e));
			});
	});
	
	
	// verify that a Todo is not created when bad data sent
	it('Should not create todo with invalid body data', (done)=>{
		// 1. check that the status code returned is 400
		request(app)
			.post('/todos')
			.send({}) // sending invalid data, should get back a 400 status
			.expect(400)
			.end((err, res)=>{
				if(err) return done(err);
				
				// 2. check that nothing has been added to the database
				Todo.find().then((todos)=>{
					expect(todos.length).toBe(0);
					done();
				}).catch((e) => done(e));
				
			})
	});
	
});