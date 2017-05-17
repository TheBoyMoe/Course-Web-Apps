/*
    #### Users
    GET	    /users	            Show all owners
    GET	    /users/new	        Show a form for creating a new owner
    GET	    /users/:id	        Show a single owner
    GET	    /users/:id/edit    Show a form for editing a owner
    POST	/users	            Create a owner when a form is submitted
    PATCH	/users/:id	        Edit a owner when a form is submitted
    DELETE	/users/:id	        Delete a owner when a form is submitted

 */
'use strict';
const express = require('express');
const router = express.Router();
const db = require('./../models/index');


// GET /users -display all users
router.get('/', (req, res, next)=>{
 db.User.find()
     .then((users)=>{
         res.render('users/index', {users});
     })
     .catch((err)=>next(err));
});


// GET /users/new -display a form allowing creation of new users
router.get('/new', (req, res, next)=>{
    res.render('users/new');
});


// GET /users/:id - display a user
router.get('/:id', (req, res, next)=>{
    db.User.findById(req.params.id)
        .then((user)=>{
            res.render('users/show', {user});
        })
        .catch((err)=>next(err));
});


// GET /users/:id/edit -enable editing of user info
router.get('/:id/edit', (req, res, next)=>{
    db.User.findById(req.params.id)
        .then((user)=>{
            res.render('users/edit', {user});
        })
        .catch((err)=>next(err));
});


// POST /users -create a new user
router.post('/', (req, res, next)=>{
    db.User.create(req.body)
        .then(()=>{
            res.redirect('/users');
        })
        .catch((err)=>next(err));
});


// PATCH /users/:id - update a user
router.patch('/:id', (req, res, next)=>{
    db.User.findByIdAndUpdate(req.params.id, req.body)
        .then((user)=>{
            res.redirect('/users');
        })
        .catch((err)=>next(err));
});


// DELETE /users/:id - delete a user
router.delete('/:id', (req, res, next)=>{
    db.User.findByIdAndRemove(req.params.id)
        .then((user)=>{
            res.redirect('/users');
        })
        .catch((err)=>next(err));
});


module.exports = router;