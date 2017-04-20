'use strict';
const express = require('express');
const router = express.Router();

const User = require('./../models/user');
const mid = require('./../middleware'); // automatically loads the index.js in that dir

// GET /
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

// GET /register - display the signup form to logged out users
router.get('/register', mid.loggedOut, (req, res, next)=>{
	return res.render('register', {title: 'Signup Form'});
});

// POST /register - capture form data - create a new user in the database when clicking on the signup form
router.post('/register', (req, res, next)=>{
	// 1. make sure user has filled out the required form fields
	if(req.body.email &&
		req.body.name &&
		req.body.favoriteBook &&
		req.body.password &&
		req.body.confirmPassword){
		
		// check that the passwords match
		if(req.body.password !== req.body.confirmPassword) {
			let err = new Error('Passwords do not match');
			err.status = 400; // bad request
			return next(err);
		}
		
		// generate user obj from input
		let userData = {
			email: req.body.email,
			name: req.body.name,
			favoriteBook: req.body.favoriteBook,
			password: req.body.password
		};
		
		// insert the obj into the database
		User.create(userData, (err, user)=>{
			if(err) return next(err);
			// redirect the user to there profile page if successful
			else {
				req.session.userId = user._id; // create session
				return res.redirect('/profile');
			}
		});
		
		
	} else {
		// generate an error - forwarded to the error handler
		let err = new Error('Hey dumbo, you need to fill in all fields!');
		err.status = 400; // bad request
		return next(err);
	}
	
});

// GET /login - disply login form to logged out users
router.get('/login', mid.loggedOut, (req, res, next)=>{
	return res.render('login', {title: 'Login'});
});

// POST /login - login post submit action
router.post('/login', (req, res, next)=>{
	// check that the user supplied a username and password
	if(req.body.email && req.body.password){
		User.authenticate(req.body.email, req.body.password, (err, user)=>{
			if(err || !user){
				let error = new Error('Email and password do not match');
				error.status = 401;
				return next(error);
			}
			// user exists, create the session (sensitive data - remains on the server, only the cookie with the session ID is sent)
			req.session.userId = user._id; // use the users mongod id
			return res.redirect('/profile');
		});
	} else {
		let err = new Error('Email and password are required');
		err.status = 401; // unauthorised - missing or bad authentication
		return next(err);
	}
});

// GET /profile
router.get('/profile', mid.requiresLogin, (req, res, next)=>{
	// the users mongo id is stored as a session variable and the session id of the cookie
	// if the user id does not exist in the session variable, they can't be logged in
	
	// replaced with middleware requiresLogin function
	// if(!req.session.userId){
	// 	let err = new Error('You are not authorised to view this page');
	// 	err.status = 403; // forbidden
	// 	return next(err);
	// }
	
	// user logged, retrieve their info from mongodb
	User.findById(req.session.userId)
		.exec((error,  user)=>{
			if(error) return next(error);
			else return res.render('profile', { // render profile template
				title: 'Profile',
				name: user.name,
				favorite: user.favoriteBook
			});
		});
	
});

// GET /logout - destroy the user session and log them out of the authentication system
router.get('/logout', (req, res, next)=>{
	// if a session obj exists, i.e user logged in
	if(req.session){
		// delete the session obj
		req.session.destroy((err)=>{
			if(err) return next(err);
			else return res.redirect('/');
		})
	}
});

// GET /secret
router.get('/secret', mid.requiresLogin, (req, res, next)=>{
	return res.render('secret', {title: 'Top Secret Page!'});
});

module.exports = router;
