/*
    References:
     [1] https://jwt.io/ (docs and tool to verify your hashing)
*/

'use strict';
const jwt = require('jsonwebtoken');

const data = {
    id: 4
};

// hash data, returning a token - client
const token = jwt.sign(data, 'qwerty');

// verify - datamust be unaltered and the secret the same as that used when the data was signed
const decoded = jwt.verify(token, 'qwerty');

console.log('decoded', decoded);