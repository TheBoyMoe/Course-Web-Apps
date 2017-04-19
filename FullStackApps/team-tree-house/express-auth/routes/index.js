'use strict';
let express = require('express');
let router = express.Router();

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
	return res.send('Your details have been added to the system');
});

module.exports = router;
