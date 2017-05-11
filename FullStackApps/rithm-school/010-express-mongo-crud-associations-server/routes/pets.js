/*
    GET	    /owners/:owner_id/pets	            Show all pets for an owner
    GET	    /owners/:owner_id/pets/new	        Show a form for creating a new pet for an owner
    GET	    /owners/:owner_id/pets/:id	        Show a single pet for an owner
    GET	    /owners/:owner_id/pets/:id/edit	    Show a form for editing an owner's pet
    POST	/owners/:owner_id/pets	            Create a pet for an owner when a form is submitted
    PATCH	/owners/:owner_id/pets/:id	        Edit an owner's pet when a form is submitted
    DELETE	/owners/:owner_id/pets/:id	        Delete an owner's pet when a form is submitted
*/

"use strict";
const express = require('express');
const router = express.Router({mergeParams: true});
const db = require('./../models/index');

// display all items
router.get('/', (req, res, next)=>{
    db.Owner.findById(req.params.owner_id)
        .populate('pets')
        .exec()
        .then((owner)=>{
            res.render('pets/index', {owner});
        })
        .catch((err)=>next(err));
});

// display a form to allow the addition of an item
router.get('/new', (req, res, next)=>{
    db.Owner.findById(req.params.owner_id)
        .then((owner)=>{
            res.render('pets/new', {owner});
        })
        .catch((err)=>next(err));
});

// get an individual item & display
router.get('/:id', (req, res, next)=>{
    db.Pet.findById(req.params.id)
        .populate('owner')
        .then((pet)=>{
            res.render('pets/show', {pet})
        })
        .catch((err)=>next(err));
});

// fetch an individual item and display it for editing
router.get('/:id/edit', (req, res, next)=>{
    db.Pet.findById(req.params.id)
        .populate('owner')
        .then((pet)=>{
            res.render('pets/edit', {pet})
        })
        .catch((err)=>next(err));
});

// create a new item in the database
router.post('/', (req, res, next)=>{
    let newPet = new db.Pet(req.body);
    newPet.owner = req.params.owner_id;
    db.Owner.findById(req.params.owner_id)
        .then((owner)=>{
            newPet.save()
                .then((pet)=>{
                    owner.pets.push(pet._id);
                    owner.save().then(()=>{
                        res.redirect(`/owners/${owner.id}/pets`);
                    })
                })
        })
        .catch((err)=>next(err));
});

// update an individual item in the database
router.patch('/:id', (req, res, next)=>{
    db.Pet.findByIdAndUpdate(req.params.id, req.body)
        .then((pet)=>{
            res.redirect(`/owners/${req.params.owner_id}/pets`);
        })
        .catch((err)=>next(err));
});

// delete item form the database
router.delete('/:id', (req, res, next)=>{
    db.Pet.findByIdAndRemove(req.params.id)
        .then((pet)=>{
            res.redirect(`/owners/${req.params.owner_id}/pets`);
        })
        .catch((err)=>next(err));
});

module.exports = router;