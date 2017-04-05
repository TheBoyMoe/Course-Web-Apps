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
	

 */
'use strict';
const express = require('express');

const $port = 3000;
const app = express();
app.get('/', (req, res)=>{
	res.send('You reached Express');
});

app.listen($port);
console.log(`Express is running on port ${$port}`);