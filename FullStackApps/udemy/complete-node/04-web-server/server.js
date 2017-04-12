/*
	References:
	[1] http://handlebarsjs.com/
	[2] https://www.npmjs.com/package/hbs (handlebars package for express)
	
 */
'use strict';
const express = require('express');
const hbs = require('hbs');

const app = express();

// set the view engine - template engine - handlebars
app.set('view engine', 'hbs');

// set up express middleware using .use() method
// set up folder for static content - html/css/js/imgs
app.use(express.static(`${__dirname}/public`));



// register handler for 'get' request
app.get('/', (req, res)=>{
	
	// res.send('<h1>Express is listening.......</h1>');
	
	// automatically converted to json - content-type in header set to 'application/json'
	// res.send({
	// 	firstname: 'Tom',
	// 	lastname: 'Jones',
	// 	age: 45,
	// 	likes: ['walking', 'baking', 'hiking', 'coding']
	// })
	
	// render hbs template
	res.render('home.hbs', {
		title: 'Welcome',
		message: 'Leberkas beef ham pancetta. Porchetta tongue boudin jerky, andouille leberkas bacon burgdoggen strip.',
		currentYear: new Date().getFullYear()
	});
});

app.get('/about', (req, res)=>{
	res.render('about.hbs', {
		title: 'About Page',
		currentYear: new Date().getFullYear()
	});
});

app.get('/bad', (req, res)=>{
	res.send({
		errorMessage: 'Unable to fulfill request'
	})
});

app.listen(3000, ()=>{
	console.log("Express is listening on port 3000");
});