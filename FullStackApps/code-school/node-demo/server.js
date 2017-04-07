"use strict";

const http = require('http');
const express = require('express');

const app = express();
app.get('/', (req, res)=>{
	res.sendFile(`${__dirname}/index.html`);
}).listen(8080, ()=>{
	console.log('Express is listening on port 8080.....');
});
