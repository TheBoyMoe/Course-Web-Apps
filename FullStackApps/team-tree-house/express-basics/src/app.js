/*
	References:
	[1] https://github.com/hdngr/treehouse-express-basics (project repo)
	[2] http://expressjs.com/en/starter/installing.html
	[3] http://expressjs.com/en/starter/hello-world.html
	[4] http://expressjs.com/en/starter/generator.html
	[5] http://expressjs.com/en/starter/basic-routing.html
	[6] http://expressjs.com/en/starter/static-files.html
	[7] https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
	[8] https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods
	[9] http://expressjs.com/en/4x/api.html (express api docs)
	[10] https://github.com/remy/nodemon (monitor any changes to your source files, automatically restarting the server https://nodemon.io/)
	[11] https://github.com/node-inspector/node-inspector (interactively debug node processes from a browser)
	[12] https://nodejs.org/dist/latest-v6.x/docs/api/debugger.html#debugger_v8_inspector_integration_for_node_js (using node's built in inspector)
	[13] https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
	[14] https://github.com/rguerreiro/express-device (determine the type of device making the request tot he server)
	
	Notes:
	1. install both nodemon and node inspector globally, e.g
		- $ npm install [package] -g
		
	2. nodemon acts as a wrapper around the node cli, to start node:
		- $ nodemon [path/to/app.js]
		
	3. you can run node inspector on it's own
		- $ node-debug [path/to/app.js] (starts node server and allows you to debug the app through the browse - server does not auto restart on changes)
		- press play in the debugger to start the application
		- access the site on the same port you specified in app.js(not port 8080 that the debugger is using)
		
	4. to run node-inspector(runs the inspector) in conjunction with nodemon(runs the server), in on cmd tab start node inspector
		- $ node-inspector (starts the debugger)
		- in a second cmd tab start nodemon (will restart server on changes)
		- $ nodemon --debug [path/to/app.js] (sets the debugger on port 5858 - inspect the app on port 8080, view site on port 3000 - express port you defined earlier)
		- you can use node, eg $ node --debug [path/to/app.js], but you don't get the benefit of server restarting automatically
	
	5. you can add the debugger statement anywhere inside your app.js file, restart nodemon (--debug-brk causes your app to break on the first line)
		- $ nodemon --debug-brk [path/to/app.js]
		
	6. node-inspector does NOT WORK with the current version of chrome/node
		- instead use the inspector built into node - experimental feature
		- $ nodemon --inspect=8080 --debug-brk [path/to app.js]
		- each time nodemon restarts the server you get a new url generated to access the inspector in, previous one will be disconnected
		
	7. each route(or endpoint) is added to handle a request. The server bundles all that data into the request object
		- you can add parameters to a route by starting the parameter with a colon, e.g :id => '/blog/:id'
		- adding a'?' (/:title?) to the parameter tels express the parameter is optional. Means that '/blog/' shows all posts, while 'blog/:title?' shows that specific post
	
	8. response contains the info needed to render the reply in the clients browser
		- send() method can be used to send a string or json
 */
'use strict';
const express = require('express'),
	  posts = require('./mock/posts.json');

const $port = 3000;
const app = express();

// debugger;

app.get('/', (req, res)=>{
	res.send('<h1>You reached Express, but is anyone home? Naaahh!</h1>');
});
app.get('/blog/:title?', (req, res)=>{
	debugger;
	// forward requests based on the blog title
	let title = req.params.title;
	if(!title) {
		res.status(503);
		res.send('This page is under construction!');
	} else {
		let post = posts[title];
		res.send(post); // send the individual post back to client
	}
});


app.listen($port, ()=>{
	console.log(`Express is running on port ${$port}`);
});
