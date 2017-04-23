'use strict';
const redis = require('./../lib/redis').client;


/**
 * Save badges to the database
 * @param {Array} badges
 * @param {Function} callback
 */
const save = (badges, callback)=>{
	if(!badges.length) return callback(null, null);
	// grab a badge from the badges array and push it onto the 'badges' list in redis
	// redis takes strings, not objects, handle any errors
	const badge = badges.pop();
	redis.lpush('badges', JSON.stringify(badge), (err)=>{
		// return the error to the caller
		if(err) return callback(err, null);
		// call the function recursively so the other badges are added to the array
		save(badges, callback);
	})
};

module.exports = {
	save
};
