'use strict';
const express = require('express');
const router = express.Router();
const db = require('./../models/index');
const auth = require('./../middleware/index');

// GET /api/users
router.get('/', (req, res, next)=>{
    db.User.find()
        .then((users) => res.status(200).send(users));
});

// GET /api/users/:id
router.get('/:id', (req, res, next)=>{
    db.User.findById(req.params.id)
        .then((user) => res.status(200).send(user));
});

// POST /api/users
router.post('/', (req, res, next)=>{
    db.User.create(req.body)
        .then((user) => res.status(201).send(user));
});

// PATCH /api/users/:id
router.patch('/:id', auth.ensureCorrectUser, (req, res, next)=>{
    db.User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then((user) => res.status(200).send(user));
});

// DELETE /api/users/:id
router.delete('/:id', auth.ensureCorrectUser, (req, res, next)=>{
    db.User.findByIdAndRemove(req.params.id)
        .then((user) => res.status(204).send(user));
});

module.exports = router;