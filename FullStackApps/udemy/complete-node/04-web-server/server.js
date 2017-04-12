/*
	References:
	[1] http://handlebarsjs.com/
	[2] https://www.npmjs.com/package/hbs (handlebars package for express)
	[3] https://help.github.com/articles/connecting-to-github-with-ssh/
	[4] https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction (heroku setup & user guide)
	
	Note:
	- to config nodemon to watch for changes in borh js and hbs files
		$ nodemon server.js -e js,hbs
 */
'use strict';
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// config partials dir in hbs
hbs.registerPartials(`${__dirname}/views/partials`);

// set the view engine - template engine - handlebars
app.set('view engine', 'hbs');

// set up express middleware using .use() method

app.use((req, res, next)=>{
	const now = new Date().toString();
	
	let log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err)=>{
		if(err)
			console.log('Unable to append to server log');
	});
	next(); // tells express you're done, and the app continues
});

// setting up a maintenance page
// app.use((req, res, next)=>{
// 	// site displays maintenance page - DO NOT check req for url, e.g req.url === ...
// 	res.render('maintenance.hbs', {
// 		title: 'We\'ll be right back',
// 		message: 'The site is down for maintenance'
// 	})
// 	// since next() is not called, app freezes on this page
// 	// none of the other routes are accessible - ensure any access of static folders
// 	// are defined after this method - methods are executed in order
// });

// set up folder for static content - html/css/js/imgs
app.use(express.static(`${__dirname}/public`));


// register handlebar helpers - functions
hbs.registerHelper('getCurrentYear', ()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
	return text.toUpperCase();
});

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
	});
});

app.get('/about', (req, res)=>{
	res.render('about.hbs', {
		title: 'About Page',
	});
});


app.listen(port, ()=>{
	console.log(`Express is listening on port ${port}`);
});