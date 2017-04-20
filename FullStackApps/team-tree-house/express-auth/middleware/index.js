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

// password protect any page on a site
const requiresLogin = (req, res, next)=>{
	// if you're logged in, carry on
	if(req.session && req.session.userId) return next();
	else {
		let err = new Error('You must be logged in to view this page');
		err.status = 401;
		return next(err);
	}
};


module.exports = {
	loggedOut,
	requiresLogin
};