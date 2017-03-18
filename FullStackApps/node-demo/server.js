let http = require('http');

// create an instance of a http server, capable of reading from
// the request stream and writing to the response stream
http.createServer(function (request, response) {
	
	response.end(`Hello world`);
	
}).listen(3000, '127.0.0.1', callback);

// listen launches the server, callback is called once the server ha spun up
function callback() {
	console.log(`Server is listening on port 3000....`);
}