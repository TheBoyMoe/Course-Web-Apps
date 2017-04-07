'use strict';

const express = require('express');
const router = express.Router();
const Question = require('./models.js').Question;

router.param('qID', (req, res, next, id)=>{
	Question.findById(req.params.qID, (err, doc)=>{
		if(err) return next(err);
		if(!doc) {
			err = new Error('Not Found');
			err.status = 404;
			return next(err);
		}
		req.question = doc;
		return next();
	});
});

// GET '/questions' route - the 'questions' parameter has been stripped away by the app since it's already matched - app.use('/questions', routes )
// the callback (route handler) is invoked when the router receives a request that matches the route and verb
router.get('/', (req, res, next)=>{
	// return all question documents,
	// passing in a projection as the 2nd parameter - in this case null since we want all docs
	// 3rd parameter how we want the docs sorted (-1 === DESC)
	Question.find({}, null, {sort: {createdAt: -1}}, (err, questions)=>{
		if(err) return next(err);
		res.json(questions); // questions are js objs, so you can pass them straight to json()
	});
	
	// let o = obj.prop; // test for internal server errors on GET '/questions'
	// return all the questions - requires a db connection
	// res.json({response: 'You sent a GET request for all the questions'});
});

// POST /questions - route for creating questions
router.post('/', (req, res, next)=>{
	let question = new Question(req.body);
	question.save((err, question)=>{
		if(err) return next(err);
		res.status(201);
		res.json(question);
	});
	
	// res.json({
	// 	response: 'You sent a POST request',
	// 	body: req.body
	// })
});


// GET '/questions/:id' - return a specific question
router.get('/:qID', (req, res, next)=>{
	res.json(req.question);
	
	// res.json({
	// 	response: `You requested the question with ID: ${req.params.qID}`
	// })
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
// express allows you to pass in any number of callback functions,
// it will invoke them sequentially - check the string passed in vote
// route prior to further processing
router.post('/:qID/answers/:aID/vote-:dir', (req, res, next)=>{
		// generate a 404 if the string does not match 'up'/'down' - exactly
		if(req.params.dir.search(/^(up|down)$/) === -1){
			let err = new Error('Not Found');
			err.status = 404;
			next(err);
		} else {
			next(); // call the next handler to execute
		}
	}, (req, res)=>{
	res.json({
		response: `You sent a POST request to /vote-${req.params.dir}`,
		questionId: req.params.qID,
		answerId: req.params.aID,
		vote: req.params.dir
	})
});

module.exports = router;