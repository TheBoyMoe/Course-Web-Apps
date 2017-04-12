'use strict';

const asyncAdd = (a, b)=>{
	return new Promise((resolve, reject)=>{
		setTimeout(()=>{
			(typeof a === 'number' && typeof  b === 'number')?
				resolve(a + b):
				reject('One or both entries were not numbers');
		}, 1500);
	})
};

asyncAdd(2,'sdfsdf').then((result)=>{
	console.log(`Result: ${result}`);
}, (errorMessage)=>{
	console.error(errorMessage);
});