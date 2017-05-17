'use strict';
const loginRequired = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.flash('error', 'Please login!');
        return res.redirect('/users/login');
    }
    next();
};

const ensureCorrectUser = (req, res, next)=>{
    if(req.user.id !== req.params.id){
        req.flash('error', 'You are not authorised to view this page!');
        req.redirect('/users');
    }
};

module.exports = {
    loginRequired,
    ensureCorrectUser
};