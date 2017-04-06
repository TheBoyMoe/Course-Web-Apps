/*
	References:
	
	[1] https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
	[2] https://en.wikipedia.org/wiki/List_of_HTTP_header_fields
	[3] https://developers.google.com/google-apps/calendar/v3/reference/#Events (api example)
	[4] https://developers.google.com/google-apps/calendar/v3/reference/events#resource-representations (example of resource representation)
	[5] https://www.getpostman.com/docs/introduction
	
 */
'use strict';

const express = require('express');

const app = express();

/*
	middleware - process client requests before handing them off to the routes
	 - : tells express what follows is a parameter
	 - use the query property on the req obj to access query parameters (req.params obj)
	 - you can pass data from one middleware function to another by assigning it as a property to the req obj
*/
app.use((req, res, next)=>{
	console.log(`The leaves are ${req.query.color}`);
	next();
});

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
	console.log(`Express is listening on port ${port}`);
});