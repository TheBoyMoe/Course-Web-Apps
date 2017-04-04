'use strict';
const fs = require('fs');

const renderView = (htmlTemplate, values, response)=>{
	// read the files contents synchronously, otherwise the browser will render the page
	// before it's had a chance to load all the templates
	let contents = fs.readFileSync(`./views/${htmlTemplate}.html`);
	
	// TODO insert values
	
	// insert the file into the page
	response.write(contents);
	
};
module.exports.view = renderView;