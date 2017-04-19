'use strict';
const express = require('express');
const router = express.Router();

const User = require('./../models/user');


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

// GET /signup - display the form
router.get('/register', (req, res, next)=>{
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
			else return res.redirect('/profile');
		});
		
		
	} else {
		// generate an error - forwarded to the error handler
		let err = new Error('Hey dumbo, you need to fill in all fields!');
		err.status = 400; // bad request
		return next(err);
	}
	
});

module.exports = router;
