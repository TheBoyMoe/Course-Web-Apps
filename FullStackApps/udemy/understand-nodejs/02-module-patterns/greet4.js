/*
	create a new version of a module every time it's called
 */
function Greetr() {
	this.greeting = 'Hello from a NEW function constructor!';
	this.greet = function () {
		console.log(this.greeting);
	}
}

module.exports = Greetr;