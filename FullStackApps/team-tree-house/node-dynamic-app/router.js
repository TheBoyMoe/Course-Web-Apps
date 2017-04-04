'use strict';
const Profile = require('./profile.js');
const renderer = require('./renderer.js');

// handle home routes, ie, GET/POST '/'
const homeRoute = (req, res)=>{
	if(req.url === '/') {
		res.writeHead(200, {'content-type': 'text/plain'});
		renderer.view('header', {}, res);
		renderer.view('search', {}, res);
		renderer.view('footer', {}, res);
		res.end();
	}
};

// handle user routes, e.g GET '/[username]'
const userRoute = (req, res)=>{
	let username = req.url.replace('/', '');
	if(username.length > 0){
		res.writeHead(200, {'content-type': 'text/plain'});
		renderer.view('header', {}, res);
		
		// fetch the users profile from treehouse
		let profile = new Profile(username);
		profile.on('end', (profileJson)=>{
			
			// store user info
			let info = {
				avatarUrl: profileJson.gravatar_url,
				username: profileJson.profile_name,
				badges: profileJson.badges.length,
				javascriptPoints: profileJson.points.JavaScript
			};
			
			renderer.view('profile', info, res);
			renderer.view('footer', {}, res);
			res.end();
		});
		profile.on('error', (err)=>{
			renderer.view('error', {errorMessage: err.message}, res);
			renderer.view('search', {}, res);
			renderer.view('footer', {}, res);
			res.end();
		});
		
	}
};

module.exports.home = homeRoute;
module.exports.user = userRoute;