'use strict';
const Profile = require('./profile.js');

// handle home routes, ie, GET/POST '/'
const homeRoute = (req, res)=>{
	if(req.url === '/') {
		res.writeHead(200, {'content-type': 'text/plain'});
		res.write('Header\n');
		res.write('Search\n');
		res.end('Footer\n');
	}
};

// handle user routes, e.g GET '/[username]'
const userRoute = (req, res)=>{
	let username = req.url.replace('/', '');
	if(username.length > 0){
		res.writeHead(200, {'content-type': 'text/plain'});
		res.write('Header\n');
		
		// fetch the users profile from treehouse
		let profile = new Profile(username);
		profile.on('end', (profileJson)=>{
			
			// store user info
			let info = {
				avatarUrl: profileJson.gravatar_url,
				username: profileJson.profile_name,
				badges: profileJson.badges.length,
				jsPoints: profileJson.points.JavaScript
			};
			
			res.write(`${info.username} has ${info.badges} badges and ${info.jsPoints} javascript points\n`);
			res.end('Footer\n');
		});
		profile.on('error', (err)=>{
			res.write(err.message + '\n');
			res.end('Footer\n');
		});
		
	}
};

module.exports.home = homeRoute;
module.exports.user = userRoute;