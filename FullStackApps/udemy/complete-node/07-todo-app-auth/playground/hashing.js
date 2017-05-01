'use strict';

const {SHA256} = require('crypto-js');
const message = 'Number 5 is alive';

let hash = SHA256(message).toString();

console.log(`Message: ${message}, hash: ${hash}`);

// using hashing with salts(secret) to impl JWT (Json Web Token)
// data to be sent
let data = {
    id: 4
};

// create token - client
let token = {
    data: data,
    hash: SHA256(JSON.stringify(data) + 'somesecretsalt').toString()
};

// man in the middle 'attack'
token.data.id = 5;
token.hash = SHA256(JSON.stringify(data)).toString(); // doesn't know the salt

// verify hash on the server
let resultHash = SHA256(JSON.stringify(token.data) + 'somesecretsalt').toString();
if(resultHash === token.hash)
    console.log('Data was not changed');
else
    console.log('Data was changed!!!');