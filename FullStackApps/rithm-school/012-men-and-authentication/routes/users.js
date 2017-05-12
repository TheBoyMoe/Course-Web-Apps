'use strict';
const express = require('express');
const router = express.Router();
const db = require('./../models/index');

// GET /users
router.get('/', (req, res, next)=>{
    res.send('logged in!');
});


// GET /users/login
router.get('/login', (req, res, next)=>{
    res.render('login');
});

// GET /users/signup
router.get('/signup', (req, res, next)=>{
    res.render('new');
});

// POST /users/login
router.post('/login', (req, res, next)=>{
    db.User.findOne({username: req.body.username})
        .then((user)=>{
            user.comparePassword(req.body.password, (err, isMatch)=>{
                if(isMatch) res.redirect('/users');
                else res.redirect('/users/login');
            })
        })
        .catch((e)=>{
            let err = new Error('User not found');
            err.status = 400;
            next(err);
        });
});

// POST /users/signup
router.post('/signup', (req, res, next)=>{
    db.User.create(req.body)
        .then((user)=>{
            res.redirect('/users/login');
        })
});

module.exports = router;