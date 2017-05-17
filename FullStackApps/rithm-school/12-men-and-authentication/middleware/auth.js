"use strict";

/* authentication */
exports.loginRequired = (req, res, next)=>{
    if(!req.session.user_id){
        req.flash('error', 'Please log in');
        res.redirect('/users/login');
    } else {
        next();
    }
};



/* authorisation */
exports.ensureCorrectUser = (req, res, next)=>{
     if(req.session.user_id !== req.params.id){
         req.flash('error', 'unauthorised');
         res.redirect('/users');
     }
};