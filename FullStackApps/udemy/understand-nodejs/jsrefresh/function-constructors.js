"use strict";

function Person(firstname, lastname, age) {
	this.firstname = firstname;
	this.lastname = lastname;
	this.age = age;
}

const person = new Person('Tom', 'Jones', 66);
const peter = new Person('Peter', 'Jones', 54);
console.log(`${person.firstname} ${person.lastname}, age ${person.age}`);

Person.prototype.greet = function () {
	console.log(`Hello my name is ${this.firstname} ${this.lastname} and I am ${this.age} years old`);
};

person.greet();
peter.greet();