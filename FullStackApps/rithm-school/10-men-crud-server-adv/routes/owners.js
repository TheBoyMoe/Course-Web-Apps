/*
    GET	    /owners	            Show all owners
    GET	    /owners/new	        Show a form for creating a new owner
    GET	    /owners/:id	        Show a single owner
    GET	    /owners/:id/edit    Show a form for editing a owner
    POST	/owners	            Create a owner when a form is submitted
    PATCH	/owners/:id	        Edit a owner when a form is submitted
    DELETE	/owners/:id	        Delete a owner when a form is submitted
*/
'use strict';
const express = require('express');
const router = express.Router();
const db = require('./../models/index');

// display all owners
router.get('/', (req, res, next)=>{
    db.Owner.find().then((owners)=>{
        res.render('owners/index', {owners});
    })
    .catch((err)=>next(err));
});

// display a form to allow the addition of a owner
router.get('/new', (req, res, next)=>{
    res.render('owners/new');
});

// get an individual owner & display
router.get('/:id', (req, res, next)=>{
    db.Owner.findById(req.params.id)
        .then((owner)=>{
            res.render('owners/show', {owner})
        })
        .catch((err)=>next(err));
});

// fetch an individual owner and display it for editing
router.get('/:id/edit', (req, res, next)=>{
    db.Owner.findById(req.params.id)
        .then((owner)=>{
            res.render('owners/edit', {owner})
        })
        .catch((err)=>next(err));
});

// create a new owner in the database
router.post('/', (req, res, next)=>{
    db.Owner.create(req.body)
        .then(()=>{
            res.redirect('/owners');
        })
        .catch((err)=>next(err));
});

// update an individual owner in the database
router.patch('/:id', (req, res, next)=>{
    db.Owner.findByIdAndUpdate(req.params.id, req.body)
        .then((owner)=>{
            res.redirect('/owners');
        })
        .catch((err)=>next(err));
});

// delete owner form the database
router.delete('/:id', (req, res, next)=>{
    db.Owner.findByIdAndRemove(req.params.id)
        .then((owner)=>{
            res.redirect('/owners');
        })
        .catch((err)=>next(err));
});

module.exports = router;