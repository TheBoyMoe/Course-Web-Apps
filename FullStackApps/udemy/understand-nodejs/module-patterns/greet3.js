/*
	Replace exports with your own object - using function constructor in this exmple
 */
 
function Greetr() {
	this.greeting = 'Hello from a function constructor!';
	this.greet = function () {
		console.log(this.greeting);
	}
}

module.exports = new Greetr();
