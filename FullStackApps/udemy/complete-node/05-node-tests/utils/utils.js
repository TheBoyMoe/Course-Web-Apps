"use strict";
const add = (a,b)=>{
	return a+b;
};

// mocha fails any tests taking longer than 2000ms
const asyncAdd = (a, b, callback)=>{
	setTimeout(()=>{
		callback(a + b);
	}, 1000);
};


const square = (x)=>{
	return x*x;
};

const asyncSquare = (x, callback)=>{
	setTimeout(()=>{
		callback(x*x);
	}, 1000);
};


const setName = (user, fullname)=>{
	let [firstname, lastname] = fullname.split(' ');
	user.firstname = firstname;
	user.lastname = lastname;
	return user;
};

module.exports = {
	add,
	square,
	setName,
	asyncAdd,
	asyncSquare
};

