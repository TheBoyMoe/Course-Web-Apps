"use strict";
const express = require('express');
const router = express.Router();
const db = require('./../models/index');

// display all items
router.get('/', (req, res, next)=>{
    db.Pet.find().then((pets)=>{
            res.render('index', {pets});
        });
});

// display a form to allow the addition of an item
router.get('/new', (req, res, next)=>{
    res.render('new');
});

// get an individual item & display
router.get('/:id', (req, res, next)=>{
    db.Pet.findById(req.params.id)
        .then((pet)=>{
            res.render('show', {pet})
        })
        .catch((err)=>next(err));
});

// fetch an individual item and display it for editing
router.get('/:id/edit', (req, res, next)=>{
    db.Pet.findById(req.params.id)
        .then((pet)=>{
            res.render('edit', {pet})
        })
        .catch((err)=>next(err));
});

// create a new item in the database
router.post('/', (req, res, next)=>{
    db.Pet.create(req.body)
        .then((pet)=>{
            res.redirect('/users');
        })
        .catch((err)=>next(err));
});

// update an individual item in the database
router.patch('/:id', (req, res, next)=>{
    db.Pet.findByIdAndUpdate(req.params.id, req.body)
        .then((pet)=>{
            res.redirect('/users');
        })
        .catch((err)=>next(err));
});

// delete item form the database
router.delete('/:id', (req, res, next)=>{
    db.Pet.findByIdAndRemove(req.params.id)
        .then((pet)=>{
            res.redirect('/users')
        })
        .catch((err)=>next(err));
});

module.exports = router;