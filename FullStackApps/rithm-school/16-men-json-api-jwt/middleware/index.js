'use strict';
require('dotenv').config({ path: __dirname + '/../variables.env' });
const jwt = require('jsonwebtoken');

const loginRequired = (req, res, next)=>{
    try{
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            if(decoded) next();
            else res.status(401).send('Please log in first');
        });
    }
    catch (err){
        res.status(401).send('Please log in first');
    }
};

const ensureCorrectUser = (req, res, next)=>{
    try{
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            if(decoded.user_id === req.params.id) next();
            else res.status(401).send('Unauthorised');
        })
    }
    catch (e){
        res.status(401).send('Unauthorised');
    }
};

module.exports = {
    loginRequired,
    ensureCorrectUser
};