"use strict";
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// seed data
const todos = [
	{
		_id: new ObjectID(),
		text: 'First todo'
	},
	{
		_id: new ObjectID(),
		text: 'Second todo',
		completed: true,
		completedAt: 234345
	},
	{
		_id: new ObjectID(),
		text: 'Third todo',
		completed: true,
		completedAt: 121234
	}
];


// clear the db before every test case is run
// use 'done' when it's an asynchronous test
beforeEach((done)=>{
	Todo.remove({}).then(()=>{
		Todo.insertMany(todos);
	}).then(() => done());
});

// test POST /todos route
describe('POST /todos', ()=>{
	
	it('should create a new todo', (done)=>{
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
				Todo.find({text: text}).then((todos)=>{
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
					expect(todos.length).toBe(3);
					done();
				}).catch((e) => done(e));
				
			})
	});
	
});


// test GET /todos route
describe('GET /todos', ()=>{
	
	it('should get all todos', (done)=>{
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res)=>{
				expect(res.body.todos.length).toBe(3);
			})
			.end(done);
	});
	
});


// test GET /todos/:id route
describe('GET /todos/:id', ()=>{

	// fetch the first todo obj from the db using it's _id (db seeded using todos array)
	it('should return todo doc', (done)=>{
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`) // convert obj id to string
			.expect(200)
			.expect((res)=>{
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});
	
	// verify that a 404 is return when the id is not found
	it('Should return 404 if todo not found', (done)=>{
		// const id = todos[1]._id.toHexString();
		const id = new ObjectID().toHexString();
		request(app)
			.get(`/todos/${id}`)
			.expect(404)
			.end(done);
	});
	
	// verify that invalid id's return a 404
	it('Should return 404 for invalid ids', (done)=>{
		const id = 'fw09fw0fjw08fhjw0jfw0hjwefh';
		request(app)
			.get(`/todos/${id}`)
			.expect(404)
			.end(done);
	});

});


// test DELETE /todos/:id route
describe('DELETE /todos/:id', ()=>{
	
	it('should remove a todo', (done)=>{
		const id = todos[0]._id.toHexString();
		request(app)
			.delete(`/todos/${id}`)
			.expect(200)
			.expect((res)=>{
				// check that the id of todo removed and sent back to client matches id retrieved
				expect(res.body.todo._id).toBe(id);
			})
			.end((err, res)=>{
				
				// check the database to make sure the todo was deleted
				if(err) return done(err);
				
				// query the database - confirm the todo does not exist
				Todo.findById(id).then((todo)=>{
					expect(todo).toNotExist();
					done();
				}).catch((e) => done(e));
			});
	});
	
	it('should return 404 if todo not found', (done)=>{
		const id = new ObjectID().toHexString();
		request(app)
			.delete(`/todos/${id}`)
			.expect(404)
			.end(done);
	});
	
	it('should return 404 if object id is invalid', (done)=>{
		const id = 'qwedwef907890wecw89ej';
		request(app)
			.delete(`/todos/${id}`)
			.expect(404 )
			.end(done);
	});
	
});


// test PATCH /todos/:id route
describe('PATCH /todos/:id', ()=>{

	it('should update the todo', (done)=>{
		// grab id of 1st item
		const id = todos[0]._id.toHexString();
		const text = 'Updated text for todo item';
		// update text, set completed === true
		request(app)
			.patch(`/todos/${id}`)
			.send({
				text: text,
				completed: true
			})
			.expect(200)
			.expect((res)=>{
				expect(res.body.todo.text).toNotBe(todos[0].text);
				expect(res.body.todo.completed).toBe(true);
				expect(res.body.todo.completedAt).toBeA('number');
			})
			.end(done);
	});

	it('should clear completedAt when todo is not completed', (done)=>{
		const id = todos[1]._id.toHexString();
		const text = 'Updated text for 2nd todo item';
		
		request(app)
			.patch(`/todos/${id}`)
			.send({
				text: text,
				completed: false
			})
			.expect(200)
			.expect((res)=>{
				expect(res.body.todo.text).toNotBe(todos[1].text);
				expect(res.body.todo.completed).toBe(false);
				expect(res.body.todo.completedAt).toNotExist(); // value is null
			})
			.end(done);
	});

});
