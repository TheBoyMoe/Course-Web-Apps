"use strict";
const add = (a,b)=>{
	return a+b;
};

const square = (x)=>{
	return x*x;
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
	setName
};

