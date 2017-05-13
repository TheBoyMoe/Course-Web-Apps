'use strict';

// load the app variable(s) defined in the .env file in the root of the app
// dotenv loads environment variables into process.env
require('dotenv').load();
const SESSION_SECRET = process.env.SESSION_SECRET;

const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const flash = require('connect-flash');

// app config
const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(session({secret: SESSION_SECRET}));
app.use(flash()); // must follow session setup

// routes
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

app.get('/', (req, res)=>{
    res.redirect('/users/login');
});

// send flash messages to all routes
app.use((req, res, next)=>{
    res.locals.message = req.flash('message');
    next();
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