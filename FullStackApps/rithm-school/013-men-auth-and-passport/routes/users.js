'use strict';
const express = require('express');
const router = express.Router();
const db = require('./../models/index');
const auth = require('./../middleware/index');

// GET /users
router.get('/', (req, res)=>{
    res.render('index');
});


// GET /users/login
router.get('/login', (req, res)=>{
    res.render('login');
});


// GET /users/signup
router.get('/signup', (req, res)=>{
    res.render('signup');
});


// POST /users/login



// POST /users/signup


// GET /users/logout


module.exports = router;