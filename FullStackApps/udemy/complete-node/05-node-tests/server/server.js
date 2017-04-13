"use strict";
const express = require('express');

const app = express();

app.get('/', (req, res)=>{
	res.send('Express is listening.....');
});

app.listen(3000, ()=>{
	console.log('Express is listening.....');
});