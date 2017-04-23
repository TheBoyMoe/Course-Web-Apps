/*
 This is a complete and feature rich Redis client for node.js.
 It supports all Redis commands and focuses on high performance.
 
 Redis is an in-memory database
 
 */
'use strict';
const redis = require('redis');
const client = redis.createClient();

// handle any errors that occur
client.on('error', (err)=>{
	// console.error('Error thrown when accessing redis database', err.message);
	// propagate the error up the call stack to any caller of the redis client
	throw err;
});


module.exports = {
	client
};