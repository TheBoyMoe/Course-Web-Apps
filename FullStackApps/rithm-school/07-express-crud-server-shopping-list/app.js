'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
app.set('view engine', 'pug');

/* middleware */
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

/* routes */
const itemRoutes = require('./routes/items');
// all routes starting '/items' are forwarded to itemRoutes
app.get('/', (req, res)=>{
    res.redirect('/items');
});
app.use('/items', itemRoutes);

/* error handling */
// catch 404 errors and forward to error handler
app.use((req, res, next)=>{
    let error = new Error('Not found');
    error.status = 404;
    next(error);
});

// dev error handler - will print stack trace
if(env === 'development'){
    app.use((err, req, res, next)=>{
        res.status(err.status || 500);
        res.render('error', {
            status: res.statusCode,
            message: err.message,
            error: err
        });
    });
}

// production error handler - no stack trace leaked to user
app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(port, ()=>{
    console.log(`Express is listening on port ${port}, env #${env}`);
});