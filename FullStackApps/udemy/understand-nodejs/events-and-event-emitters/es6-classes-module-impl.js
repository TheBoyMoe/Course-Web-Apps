const Greetr = require('./es6-classes-and-modules');

let greet1 = new Greetr();
greet1.on('greet', (data)=>{
	console.log(`${data} said hello`); // callback function placed in the event array
});

greet1.greet('Tom');