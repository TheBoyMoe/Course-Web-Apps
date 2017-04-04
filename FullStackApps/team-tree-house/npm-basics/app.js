/*
	useful npm commands:
	$ npm init (initialize the project)
	$ npm install -h
	$ npm install (install all package dependencies - requires package.json file)
	$ npm install [package] -g (install globally)
	$ npm install [package] --save (add to package.json dependencies property)
	$ npm install [package] --save-dev (dev package required to develop the project, but not for the project to run)
	$ NODE_ENV=production npm install (only install required dependencies, NO dev-dependencies)
	$ npm outdated (displays out of date packages - no response means up-to-date)
	$ npm outdated -g (list outdated global packages)
	$ npm update (update any out of date packages to latest)
	$ npm update -g (update any outdated global packages)
	$ npm update [package] -g (to update specific global packages - which are not included in package.json, e.g npm and http-server)
	$ npm uninstall [package] (uninstall specific package)
	$ npm uninstall [package] ( add the --save or --save-dev flags to remove from reference from package.json)
	$ npm uninstall [package] -g (uninstall a global package)
	$ npm help install (returns help page for that particular command)
	
	
	Note: Semantic Versioning
	MAJOR.MINOR.PATCH, e.g 0.8.3
	
	^ before a version number means install up to the latest MINOR release.
	e.g. ^1.1 can install 1.3 if available but not 2.0
	
	~ before a version number means install up to the latest PATCH release.
	e.g. ~2.0.1 can install 2.0.9 if available but not 2.1.0

	Without a ~ or ^ - install that specific version
	
	Major releases tend to not be compatible with previous versions
 
 
 References:
	[1] http://treehouse.github.io/installation-guides/linux/node-linux.html (node & npm install guide)
	[2] http://semver.org/ (Semantic Versioning)
	[3] https://docs.npmjs.com/ (npm docs)
	
 */
'use strict';
const bcrypt = require('bcrypt');
const colors = require('colors');

let myPassword = 'rumplestiltskin';
let saltRounds = 10;

bcrypt.genSalt(saltRounds, (err, salt)=>{
	bcrypt.hash(myPassword, salt, (err, hash)=>{
		if(err) console.error(err.message);
		console.log(hash.green);
	});
});