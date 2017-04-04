// handle home routes, ie, GET/POST '/'
const homeRoute = (req, res)=>{
	if(req.url === '/') {
		res.writeHead(200, {'content-type': 'text/plain'});
		res.write('Header\n');
		res.write('Search\n');
		res.end('Footer\n');
	}
};

// handle user routes, e.g GET '/[username]'
const userRoute = (req, res)=>{
	let username = req.url.replace('/', '');
	if(username.length > 0){
		res.writeHead(200, {'content-type': 'text/plain'});
		res.write('Header\n');
		res.write(`${username}\n`);
		res.end('Footer\n');
	}
};

module.exports.home = homeRoute;
module.exports.user = userRoute;