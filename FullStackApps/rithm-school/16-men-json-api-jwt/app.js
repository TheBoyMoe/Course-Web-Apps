/*
    References:
    [1] https://jwt.io/introduction/
    [2] https://auth0.com/blog/cookies-vs-tokens-definitive-guide/

 */
'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const auth = require('./middleware/index');

// app config
const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// routes
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
app.use('/api/users', auth.loginRequired, userRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.redirect('/api/users'));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));


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
        res.send('error', {
            message: err.message,
            error: err
        });
    });
}

// prod errors - no stack trace
app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.send('error', {
        message: err.message,
        error: {}
    });
});

app.listen(port, ()=>{
    console.log(`Express is listening on port ${port}`);
});

module.exports = app; // export the app  for testing