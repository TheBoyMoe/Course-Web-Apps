'use strict';
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const request = require('supertest');
const expect = require('chai').expect;
const app = require('./../app');
const db = require('./../models/index');

/* test setup and teardown */
let token, auth = {};

function loginUser(auth) {
    return function(done) {
        request(app)
            .post('/api/auth/login')
            .send({
                username: 'test',
                password: 'secret'
            })
            .expect(200)
            .end(onResponse);
        
        function onResponse(err, res) {
            auth.token = res.body.token;
            return done();
        }
    };
}

beforeEach(function(done){
    db.User.create({username:'test', password:'secret'}).then(function(user) {
        auth.current_user = user;
        done();
    });
});

beforeEach(loginUser(auth));

afterEach(function(done){
    db.User.remove({}).then(function() {
        done();
    });
});

/* Testing routes */
describe('POST /auth/signup', ()=>{
    it('responds with JSON when created', (done)=>{
        request(app)
            .post('/api/auth/signup')
            .send({username: 'elie', password:'secret'})
            .set('Accept', 'application/json')
            .expect(201, done);
    });
});

describe('POST /auth/login', function() {
    it('responds with JSON', function(done) {
        request(app)
            .post('/api/auth/login')
            .send({username: 'test', password:'secret'})
            .set('Accept', 'application/json')
            .expect(200, done);
    });
});

describe('GET /users', function() {
    it('responds with JSON', function(done) {
        request(app)
            .get('/api/users')
            .set('Authorization', 'bearer: ' + auth.token)
            .expect(200, done);
    });
});

describe('GET /users/:id', function() {
    it('responds with JSON', function(done) {
        request(app)
            .get(`/api/users/${auth.current_user.id}`)
            .set('Authorization', 'bearer: ' + auth.token)
            .expect(200, done);
    });
});

describe('PATCH /users/:id', function() {
    it('responds with JSON', function(done) {
        request(app)
            .get(`/api/users/${auth.current_user.id}`)
            .set('Authorization', 'bearer: ' + auth.token)
            .expect(200, done);
    });
});

describe('PATCH /users/:id', function() {
    it('responds with JSON', function(done) {
        request(app)
            .patch(`/api/users/${auth.current_user.id}`)
            .send({
                username:'bob'
            })
            .set('Authorization', 'bearer: ' + auth.token)
            .expect(200, done);
    });
});

describe('DELETE /users/:id', function() {
    it('responds with JSON', function(done) {
        request(app)
            .delete(`/api/users/${auth.current_user.id}`)
            .set('Authorization', 'bearer: ' + auth.token)
            .expect(204, done);
    });
});




