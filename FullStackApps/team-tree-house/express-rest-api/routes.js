'use strict';

const express = require('express');
const router = express.Router();

// GET '/questions' route - the 'questions' parameter has been stripped away by the app since it's already matched - app.use('/questions', routes )
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


// GET '/questions/:id' - return a specific question
router.get('/:qID', (req, res)=>{
	res.json({
		response: `You requested the question with ID: ${req.params.qID}`
	})
});

// POST /questions/:id/answers - route for creating answers to a specific question
router.post('/:qID/answers', (req, res)=>{
	res.json({
		response: `You tried to POST a request to /answers`,
		questionId: req.params.qID,
		body: req.body
	})
});

// PUT '/questions/:qID/answers/:aID' - route for updating/editing a specific answer
router.put('/:qID/answers/:aID', (req, res)=>{
	res.json({
		response: 'You sent a PUT request to /answers',
		questionId: req.params.qID,
		answerId: req.params.aID,
		body: req.body
	})
});

// DELETE '/questions/:qID/answers/:aID' - route for deleting specific answers to questions
router.delete('/:qID/answers/:aID', (req, res)=>{
	res.json({
		response: 'You sent a DELETE request to /answers',
		questionId: req.params.qID,
		answerId: req.params.aID
	})
});

// POST '/questions/:qID/answers/:aID/vote-up'
// POST '/questions/:qID/answers/:aID/vote-down'
router.post('/:qID/answers/:aID/vote-:dir', (req, res)=>{
	res.json({
		response: `You sent a POST request to /vote-${req.params.dir}`,
		questionId: req.params.qID,
		answerId: req.params.aID,
		vote: req.params.dir
	})
});

module.exports = router;