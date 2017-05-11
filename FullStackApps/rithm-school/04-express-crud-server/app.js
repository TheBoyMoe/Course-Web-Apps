/*
    'Full CRUD' means that we can perform Create, Read, Update, Delete operations on whatever resource we're working on.
    Thus  if you resource were users, we would have routes for the following (using RESTful convention):
 
    HTTP Verb	Path	            Description
    GET         /users	            Show all users
    GET         /users/new	        Show a form for creating a new user
    GET	        /users/:id	        Show a single user
    GET	        /users/:id/edit	    Show a form for editing a user
    POST	    /users	            Create a user when a form is submitted
    PATCH	    /users/:id	        Edit a user when a form is submitted
    DELETE	    /users/:id	        Delete a user when a form is submitted

    - html forms only use GET and POST methods. So we need to override these to implement PATCH and DELETE
    - this can be done using a header in the request, or through the query string with the help of a 3rd party package, method-override
    - to use method override, add '_method=PATCH' or '_method=DELETE' into the query string - where '_method ids the key and the http verb the value, e.g
 
     form(action=`/create-new-user/${user.id}?_method=PATCH` method="POST")
         input(type="text" name="first" value=`${first}`)
         input(type="text" name="last" value=`${last}`)
    
    - the form MUST use the POST method
    
    
    References:
    [1] https://expressjs.com/en/guide/error-handling.html
    [2] https://www.joyent.com/node-js/production/design/errors
    [3] https://derickbailey.com/2014/09/06/proper-error-handling-in-expressjs-route-handlers/
    [4] https://expressjs.com/en/starter/generator.html (express-generator app)
    [5] https://github.com/expressjs/morgan (express terminal logger)
    
 */

'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
app.set('view engine', 'pug');

let users = [];
let id = 1;

/* ------------ middleware -------------------- */
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

/* ------------ routes ------------------------- */
app.get('/', (req, res, next)=>{
    res.redirect('/users');
});

app.get('/users', (req, res, next)=>{
    res.render('index', {users: users});
});

app.get('/users/new', (req, res, next)=>{
    // render a page called new.pug inside the views folder. In this file there will be
    // a form that when submitted will POST to /users
    res.render('new');
});

app.get('/users/:id', (req, res, next)=>{
    // find a user by their id using the find method on arrays. We also have to make sure
    // that we convert req.params.id into a number from a string so we can safely compare
    let user = users.find((user)=>{
        return user.id === Number(req.params.id);
    });
    res.render('show', {user: user});
});

app.get('/users/:id/edit', (req, res, next)=>{
    // find a user by their id using the find method on arrays. We also have to
    // make sure that we convert req.params.id into a number from a string so we can safely compare
    let user = users.find((user)=>{
        return user.id === Number(req.params.id);
    });
    res.render('edit', {user: user});
});

app.post('/users', (req, res, next)=>{
    // create a new user and add them to the users array - in production you'd be adding them to a database
    users.push({
        name: req.body.name,
        id: id
    });
    // increment the id for the next user to be added
    id++;
    res.redirect('/users');
});

// this route will be requested when a form updating a user is submitted
app.patch('/users/:id', (req, res, next)=>{
    // find the user
    let user = users.find((user)=>{
        return user.id === Number(req.params.id);
    });
    // update their name with the data from the form
    user.name = req.body.name;
    res.redirect('/users');
});

// this route will be requested when a form for deleting a user is submitted
app.delete('/users/:id', (req, res, next)=>{
    // find the user in the array and remove them
    let userIndex = users.findIndex((user)=>{
        return user.id === Number(req.params.id);
    });
    users.splice(userIndex, 1);
    res.redirect('/users');
});


/* handle errors - middleware - need to be defined AFTER your routes */

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

