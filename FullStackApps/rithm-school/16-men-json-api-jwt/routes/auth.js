'use strict';
require('dotenv').config({ path: __dirname + '/../variables.env' });
const express = require('express');
const router = express.Router();
const db = require('./../models/index');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res)=>{
    db.User.findOne({username: req.body.username})
        .then((user)=>{
            user.comparePassword(req.body.password, (err, isMatch)=>{
                if(isMatch){
                    let token = jwt.sign({user_id: user.id}, process.env.SECRET_KEY);
                    res.status(200).send({token});
                } else {
                    res.status(400).send('Invalid credentials!');
                }
            })
        }, (err) => res.status(400).send('Invalid credentials!'));
});

router.post('/signup', (req, res)=>{
    db.User.create(req.body)
        .then((user)=>{
            let token = jwt.sign({user_id: user.id}, process.env.SECRET_KEY);
            res.status(201).send({token});
        })
});

router.get('/logout', (req, res)=>{
    req.session.user_id = null;
    res.redirect('/api/auth/login');
});

module.exports = router;
