"use strict";

function Person(firstname, lastname, age) {
	this.firstname = firstname;
	this.lastname = lastname;
	this.age = age;
}

const tom = new Person('Tom', 'Jones', 66);
const peter = new Person('Peter', 'Jones', 54);
console.log(`${tom.firstname} ${tom.lastname}, age ${tom.age}`);

Person.prototype.greet = function () {
	console.log(`Hello my name is ${this.firstname} ${this.lastname} and I am ${this.age} years old`);
};

tom.greet();
peter.greet();


// another pattern in js for creating objects and using prototypal inheritance

const person = {
	firstname: '',
	lastname: '',
	greet() {
		console.log(`${this.firstname} ${this.lastname}`);
	}
};

// create your obj instances using Object.create() - in this pattern the person obj is used as the prototype
// for each obj instance - you inherit the props and methods
//  - when you define props with the same name on the instance, you hide the ones inherited
let john = Object.create(person);
john.firstname = 'John'; // overrides the prop in the prototype
john.lastname = 'Smith';
john.greet();

let jane = Object.create(person);
jane.firstname = 'Jane';
jane.lastname = 'Smith';
jane.greet();

