'use strict';

const express = require('express');
const router = express.Router();

let users = [];
let id = 1;

/* User routes */
router.get('/', (req, res, next)=>{
    res.render('index', {users: users});
});

router.get('/new', (req, res, next)=>{
    res.render('new');
});

router.get('/:id', (req, res, next)=>{
    let user = users.find((user)=>{
        return user.id === Number(req.params.id);
    });
    res.render('show', {user: user});
});

router.get('/:id/edit', (req, res, next)=>{
    let user = users.find((user)=>{
        return user.id === Number(req.params.id);
    });
    res.render('edit', {user: user});
});

router.post('/', (req, res, next)=>{
    users.push({
        name: req.body.name,
        id: id
    });
    // increment the id for the next user to be added
    id++;
    res.redirect('/users');
});

router.patch('/:id', (req, res, next)=>{
    // find the user
    let user = users.find((user)=>{
        return user.id === Number(req.params.id);
    });
    // update their name with the data from the form
    user.name = req.body.name;
    res.redirect('/users');
});

router.delete('/:id', (req, res, next)=>{
    let userIndex = users.findIndex((user)=>{
        return user.id === Number(req.params.id);
    });
    users.splice(userIndex, 1);
    res.redirect('/users');
});

module.exports = router;