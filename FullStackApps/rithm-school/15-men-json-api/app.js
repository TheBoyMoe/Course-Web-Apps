'use strict';
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// app config
const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routes
const petRoutes = require('./routes/pets');
app.use('/api/pets', petRoutes);
app.get('/', (req,res)=>{
    res.redirect('/api/pets');
});

// handle favicon
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