'use strict';

// CUSTOM MIDDLEWARE

// prevent logged in users from accessing certain routes, eg login
const loggedOut = (req, res, next)=>{
	// is the user logged in? if so redirect them to their profile page
	// we can add this function to any route that we do not want a logged in user to see
	if(req.session && req.session.userId){
		return res.redirect('/profile');
	}
	// if the user is not logged in, execution is passed to the next piece of middleware in the chain
	return next();
};


module.exports = {
	loggedOut
};