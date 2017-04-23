/*
	References:
	[1] https://github.com/tj/axon (pub/sub server)
	[2] https://github.com/codeschool/WatchUsBuild-ImageStreamingAppWithNodeWebServer
	[3] https://github.com/codeschool/WatchUsBuild-ImageStreamingAppWithNodePubSubServer
	[4] https://www.npmjs.com/package/redis (redis client setup)
	[5] https://redis.io/ (redis docs)
	
	
 */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const badges = require('./controllers/badges');

const app = express();

// middleware - parse any json data in the body of any request
app.use(bodyParser.json());

// pass post requests to '/' to the badges controller, calls save(), trim(), then send()
app.post('/', badges.save, badges.trim, badges.send);

// get the ten last badges to populate the client to begin with,
// each subsequent badge will be received via the socket
app.get('/badges', badges.get);

app.listen(port, ()=>{
	console.log(`Express is listening on port ${port}`);
});