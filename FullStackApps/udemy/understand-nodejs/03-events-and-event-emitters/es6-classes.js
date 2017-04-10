'use strict';

class Person {
	// any props defined in the constructor are added to each obj instance
	constructor(firstname, lastname){
		this.firstname = firstname;
		this.lastname = lastname;
	}
	
	// any methods defined are added to the prototype
	greet(){
		console.log(`${this.firstname} ${this.lastname}`);
	}

}

let john = new Person('John', 'Smith');
let jane = new Person('Jane', 'Smith');

john.greet();
jane.greet();