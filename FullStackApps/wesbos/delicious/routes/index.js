const express = require('express');
const router = express.Router();

/*
    req.query.name --> http://somedomain.com?name=refdre
    req.params.userId --> http://somedomain.com/users/:id
    req.body.name --> for POST's variables, e.g input field with name variable
    
    res.json()
    res.send()
    res.render()
    res.redirect()
 */

// Do work here
router.get('/', (req, res) => {
    console.log('You just checked the home page!');
    res.render('hello');
});

module.exports = router;
