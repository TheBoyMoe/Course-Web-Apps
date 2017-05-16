/*
    Setting up passport:
    1. select a strategy (how authentication is to be processed).
        - Local Strategy  involves username and password
        - External strategy - involves some 3rd party provider that will
        provide the authentication service, e.g Facebook, Google, etc
    2. create a new object from the strategy's constructor function,
        passing in an optional configuration object(first parameter)
    3. pass in a 2nd parameter which is a callback function(the verify callback)
    4. if authentication is successful the user will be serialised - their info stored in the
        session object, marking them as logged in and redirected to the successRoute.

 */
'use strict';
require('dotenv').config({path: 'variables.env'});
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('cookie-session');


// config app
const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// passport setup
app.use(session({secret: process.env.SESSION_SECRET}));
app.use(passport.initialize());
app.use(passport.session());


// routes
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

app.get('/', (req, res)=>{
    res.redirect('/users');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

// error handling
app.use((req, res, next)=>{
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// dev errors - print stack trace
if(env === 'development'){
    app.use((err, req, res, next)=>{
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// prod errors - no stack trace
app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(port, ()=>{
    console.log(`Express is listening on port ${port}`);
});