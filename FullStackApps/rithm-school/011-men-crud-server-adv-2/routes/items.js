/*
    #### Items
    GET	    /users/:user_id/items	            Show all pets for an owner
    GET	    /users/:user_id/items/new	        Show a form for creating a new pet for an owner
    GET	    /users/:user_id/items/:id	        Show a single pet for an owner
    GET	    /users/:user_id/items/:id/edit	    Show a form for editing an owner's pet
    POST	/users/:user_id/items	            Create a pet for an owner when a form is submitted
    PATCH	/users/:user_id/items/:id	        Edit an owner's pet when a form is submitted
    DELETE	/users/:user_id/items/:id	        Delete an owner's pet when a form is submitted
 
 */
'use strict';
const express = require('express');
const router = express.Router({mergeParams: true});
const db = require('./../models/index');

// GET  /users/:user_id/items - display all items
router.get('/', (req, res, next)=>{
    db.User.findById(req.params.user_id)
        .populate('items')
        .exec()
        .then((user)=>{
            res.render('items/index', {user});
        })
        .catch((err)=>next(err));
});

// GET /users/:user_id/items/new - display a form to allow the addition of an item
router.get('/new', (req, res, next)=>{
    db.User.findById(req.params.user_id)
        .then((user)=>{
            res.render('items/new', {user});
        })
        .catch((err)=>next(err));
});

// GET /users/:user_id/items/:id - get an individual item & display
router.get('/:id', (req, res, next)=>{
    db.Item.findById(req.params.id)
        .populate('user')
        .then((item)=>{
            res.render('items/show', {item})
        })
        .catch((err)=>next(err));
});

// GET /users/:user_id/items/:id/edit - fetch an individual item and display it for editing
router.get('/:id/edit', (req, res, next)=>{
    db.Item.findById(req.params.id)
        .populate('user')
        .then((item)=>{
            res.render('items/edit', {item})
        })
        .catch((err)=>next(err));
});

// POST /users/:user_id/items - create a new item in the database
router.post('/', (req, res, next)=>{
    let newItem = new db.Item(req.body);
    newItem.user = req.params.user_id;
    db.User.findById(req.params.user_id)
        .then((user)=>{
            newItem.save()
                .then((item)=>{
                    user.items.push(item._id);
                    user.save().then(()=>{
                        res.redirect(`/users/${user.id}/items`);
                    })
                })
        })
        .catch((err)=>next(err));
});

// PATCH /users/:user_id/items/:id - update an individual item in the database
router.patch('/:id', (req, res, next)=>{
    db.Item.findByIdAndUpdate(req.params.id, req.body)
        .then((item)=>{
            res.redirect(`/users/${req.params.user_id}/items`);
        })
        .catch((err)=>next(err));
});

// DELETE /users/:user_id/items/:id - delete item form the database
router.delete('/:id', (req, res, next)=>{
    db.Item.findByIdAndRemove(req.params.id)
        .then((item)=>{
            res.redirect(`/users/${req.params.user_id}/items`);
        })
        .catch((err)=>next(err));
});

// TODO GET /users/:user_id/items/search - seach user shopping list
router.get('/search', (req, res, next)=>{
    
    db.Item.findOne({name: req.body.name})
        .then((item)=>{
            res.redirect(`/users/${req.params.user_id}/items/show`, {item});
        })
        .catch((err)=>next(err));
});


// TODO DELETE //users/:user_id/items - delete all items in the list
router.delete('/items', (req, res, next)=>{

});

module.exports = router;