let http = require('http');
let fs = require('fs');

// create an instance of a http server, capable of reading from
// the request stream and writing to the response stream
http.createServer(function (request, response) {
	console.log(`Incoming request: ${request.url}`);
	
	// to server up static files on the hard drive requires the fs module
	if(request.url.startsWith('/static/')){
		// read file using the async version - DO NOT USE THIS PARTICULAR TECHNIQUE IN PRODUCTION
		fs.readFile(request.url.substr(1), function (error, data) {
			if(error){
				console.log(`Error file not found ${error}`);
				response.statusCode = 404;
				response.end('404 File Not Found');
				return;
			}
			// otherwise write the data in the file to the response stream
			response.end(data);
		});
		return;
	}	
	// display response for all other requests
	response.end(`Hello world`);
	
}).listen(3000, '127.0.0.1', callback);

// listen launches the server, callback is called once the server ha spun up
function callback() {
	console.log(`Server is listening on port 3000....`);
}