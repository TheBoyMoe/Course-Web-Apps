'use strict';

const express = require('express');
const router = express.Router();

// GET '/questions' route - the 'questions' parameter has been stripped away by the app since it's already matched
// the callback (route handler) is invoked when the router receives a request that matches the route and verb
router.get('/', (req, res)=>{
	// return all the questions - requires a db connection
	res.json({response: 'You sent a GET request for all the questions'});
});

// POST /questions - route for creating questions
router.post('/', (req, res)=>{
	res.json({
		response: 'You sent a POST request',
		body: req.body
	})
});


// GET 'questions/:id' - return a specific question
router.get('/:id', (req, res)=>{
	res.json({
		response: `You requested the question with ID: ${req.params.id}`
	})
});


module.exports = router;