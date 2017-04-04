'use strict';
const fs = require('fs');

const mergeValues = (values, content)=>{
	// iterate over the values' obj props
	for(let p in values){
		if(values.hasOwnProperty(p))
			content = content.replace(`{{${p}}}`, values[p]);
	}
	return content;
};

const renderView = (htmlTemplate, values, response)=>{
	
	// read the files contents synchronously, otherwise the browser will render the page
	// before it's had a chance to load all the templates from disk
	let contents = fs.readFileSync(`./views/${htmlTemplate}.html`, {encoding: 'utf-8'});
	
	// insert values
	
	contents = mergeValues(values, contents);
	// insert the file into the page
	response.write(contents);
	
};
module.exports.view = renderView;