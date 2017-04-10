/*
	using call() and apply()
	- call() - pass in any parameters as a comma separated list, e.g obj.method.call([obj], a,b,c)
	- apply() - pass in any parameters as an array, e.g obj.method.apply([obj], [a,b,c])
 */
"use strict";

const obj = {
	firstname: 'Tom',
	lastname: 'Jones',
	greet() {
		console.log(`${this.firstname} ${this.lastname}`);
	}
};

obj.greet();

// using call allows you to 'borrow' methods of other objects as long as the object you're using
// has the same props used in that method - call allows you to set the object that will be the 'this' keyword
obj.greet.call({firstname: 'Peter', lastname: 'Jones', age: 67, address: '1 the street'});