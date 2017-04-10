'use strict';
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const data = [
	{
		firstname: 'Tom',
		lastname: 'Jones'
	},
	{
		firstname: 'Peter',
		lastname: 'Jones'
	}
];

// define location of static files - redirect any requests for files in
// the assets folder to public
app.use('/assets', express.static(`${__dirname}/public`));

app.get('/', (req, res)=>{
	res.send(`<html>
					<head>
						<link href="assets/styles.css" rel="stylesheet" type="text/css"/>
					</head>
					<body>
						<h1>Express server if listening on port ${port}...</h1>
					</body>
				</html>`);
});

// the colon, ':', indicates that the value that follows can be anything, is dynamic
app.get('/person/:id', (req, res)=>{
	res.send(`<html><head></head><body><h1>Person: ${req.params.id}</h1></body></html>`);
});

app.get('/api', (req, res)=>{
	res.json(data);
});

app.listen(port);