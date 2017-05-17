/*
    // basic api routes
    GET     /pets           show all pets
    GET     /pets/:id       show a single pet
    POST    /pets           create a pet
    PATCH   /pets/:id       update a pet
    DELETE  /pets/:id       delete a pet
    
    // http error codes
    200     OK (for getting/updating)
    201     Created (for creating)
    204     No content (for deleting)
    500     Internal server error (if something goes wrong at our end)
 */
'use strict';
const express = require('express');
const router = express.Router();
const db = require('./../models/index');

// GET /pets
router.get('/', (req, res, next)=>{
    db.Pet.find()
        .then((pets) => res.status(200).send(pets));
});


// GET /pets/:id
router.get('/:id', (req, res, next)=>{
    db.Pet.findById(req.params.id)
        .then((pet) => res.status(200).send(pet));
});

// POST /pets
router.post('/', (req, res, next)=>{
    db.Pet.create(req.body)
        .then((pet) => res.status(201).send(pet));
});


// PATCH /pets/:id
router.patch('/:id', (req, res, next)=>{
    db.Pet.findByIdAndUpdate(req.params.id)
        .then((pet) => res.status(200).send(pet));
});


// DELETE /pets/:id
router.delete('/:id', (req, res, next)=>{
    db.Pet.findByIdAndRemove(req.params.id)
        .then((pet) => res.status(204).send('Deleted item!'));
});

module.exports = router;