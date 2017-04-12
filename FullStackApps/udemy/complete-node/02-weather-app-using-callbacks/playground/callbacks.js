'use strict';
// callback function using synchronous programming
const getUser = (id, callback)=>{
	let user = {
		id: id,
		name: 'Tom Jones'
	};
	
	setTimeout(()=>{
		callback(user);
	}, 2000);
	
};

const displayUser = (user)=>{
	console.log(user);
};

getUser(12343, displayUser);