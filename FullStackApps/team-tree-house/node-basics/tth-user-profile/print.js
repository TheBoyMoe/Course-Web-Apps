'use strict';

// helper functions
const printMessage = (username, badgeCount, points)=>{
	const message = `${username} has ${badgeCount} badges and ${points} points in javascript!`;
	console.log(message);
};

const printErrorMessage = (type, message)=>{
	console.error(type, message);
};

module.exports.success = printMessage;
module.exports.error = printErrorMessage;