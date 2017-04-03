'use strict';

const profile = require('./profile.js');

let users = process.argv.slice(2);
for(let user of users)
	profile.get(user);