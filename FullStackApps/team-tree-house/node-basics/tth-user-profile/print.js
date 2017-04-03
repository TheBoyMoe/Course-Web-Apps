'use strict';

// helper functions
const printMessage = (username, badgeCount, points)=>{
	const message = `${username} has ${badgeCount} badges and ${points} points in javascript!`;
	console.log(message);
};

const printErrorMessage = (location, message)=>{
	console.error(location, message);
};

module.exports.success = printMessage;
module.exports.error = printErrorMessage;