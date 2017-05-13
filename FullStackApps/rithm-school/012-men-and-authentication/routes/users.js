'use strict';
const express = require('express');
const router = express.Router();
const db = require('./../models/index');
const authMiddleware = require('./../middleware/auth');

// GET /users - ensure users are logged in
router.get('/', authMiddleware.loginRequired, (req, res, next)=>{
    res.render('index');
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
                if(isMatch) {
                    req.session.user_id = user.id;
                    req.flash('message', 'logged in!');
                    res.redirect('/users');
                }
                else {
                    req.flash('message', 'invalid credentials');
                    res.redirect('/users/login');
                }
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
            req.flash('Successfully registered, now log in!');
            res.redirect('/users/login');
        })
});

// GET /users/logout
router.get('/logout', (req, res, next)=>{
    req.session.user_id = null;
    req.flash('message', 'logged out!');
    res.redirect('/users/login');
});

module.exports = router;