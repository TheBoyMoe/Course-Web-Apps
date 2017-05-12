/* basic bcrypt use */
'use strict';
const bcrypt = require('bcrypt');
let password = 'password';
let dbPassword;
let saltRounds = 10;

bcrypt.hash(password, saltRounds)
    .then((hashPassword)=>{
        console.log('hash', hashPassword);
        return hashPassword;
    })
    .then((hash)=>{
        return bcrypt.compare(password, hash);
    })
    .then((result)=>{
        console.log('match', result); // true
    });

