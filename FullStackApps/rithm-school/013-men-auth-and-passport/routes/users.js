'use strict';
const express = require('express');
const router = express.Router();
const db = require('./../models/index');
const auth = require('./../middleware/index');
const passport = require('passport');
const LocalStrategy = require('passport-local');


// passport local strategy
passport.use(new LocalStrategy({
    // configuration object, you must use the keys 'usernameField' and 'passwordField' when using a local strategy.
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true // default false, when true 1st param of verifyCallback will be req obj
    
}, function verifyCallback(req, username, password, done) {
    // username and password fields are entered by user, done is a callback function
    db.User.findOne({usename: username}, (err, user)=>{
        if(err) return done(err);
        if(!user) return done(null, false);
        user.comparePassword(password, (error, isMatch)=>{
            if(isMatch) return done(null, user);
            return done(null, false);
        })
    })
}));

// only run if the verify callback returns a truthy value as the 2nd parameter,
// the successCallback is run next
passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    db.User.findById(id)
        .then((user)=>{
            done(null, user);
        });
});

// GET /users
router.get('/', auth.loginRequired, (req, res)=>{
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
router.post('/login', passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/users/login'
}));


// POST /users/signup
router.post('/signup', (req, res)=>{
    db.User.create(req.body)
        .then((user)=>{
            req.login(user, (err)=>{
                return res.redirect('/users');
            })
        })
        .catch((err)=>next(err));
});

// GET /users/logout
router.get('/logout', (req, res)=>{
    req.logout();
    req.flash('message', 'logged out!');
    res.redirect('/users/login');
});

module.exports = router;