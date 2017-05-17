'use strict';
require('dotenv').config({path: 'variables.env'});
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const flash = require('connect-flash');
const passport = require('passport');
const db = require('./models/index');
const FacebookStrategy = require('passport-facebook');

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

app.use(session({secret: process.env.SESSION_SECRET}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes
const loginRequired = (req, res, next)=>{
    if(req.isAuthenticated()) return res.redirect('/');
    return next();
};

app.get('/', (req, res)=>{
    res.send('Go to /auth/facebook');
});

app.get('welcome', loginRequired, (req, res)=>{
    res.send('Logged in!');
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/welcome',
    failureRedirect: '/login'
}));

// send flash messages to all routes
app.use(function(req, res, next){
    res.locals.message = req.flash('message');
    next();
});

passport.use(new FacebookStrategy({
        // these should ALL be values coming from a .env file
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        // when you deploy your application you can add an environment variable for CALLBACK_URL, right now let's stick with localhost:3000/auth/facebook/callback
        callbackURL: process.env.CALLBACK_URL || "http://localhost:3000/auth/facebook/callback"
    },
    // in the verify callback we will get an accessToken to make authenticated requests on the users behalf along with a refreshToken which is used in some authentication strategies to refresh an expired accessToken. We also are given an object called "profile" which has data on the authenticated user
    function(accessToken, refreshToken, profile, done) {
        db.User.findOrCreate({facebook_id: profile.id}, function(err,user) {
            if(err) return done(err);
            done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    db.User.findById(id, function(err, user) {
        done(err, user);
    });
});


app.get('/logout', function(req,res){
    req.logout();
    req.flash('message', 'logged out!');
    res.send('logged out!')
});


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