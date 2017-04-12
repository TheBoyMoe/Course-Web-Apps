'use strict';
console.log('Starting.......');
setTimeout(()=>{
	console.log('Called after 2000ms delay')
}, 2000);

setTimeout(()=>{
	console.log('Called immediately');
}, 0);

console.log('Finishing......');
