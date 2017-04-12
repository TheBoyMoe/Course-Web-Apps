'use strict';

const asyncAdd = (a, b)=>{
	return new Promise((resolve, reject)=>{
		setTimeout(()=>{
			(typeof a === 'number' && typeof  b === 'number')?
				resolve(a + b):
				reject('One or both entries were not numbers');
		}, 1000);
	})
};


// THIS PATTERN DOES NOT WORK
// - you get fall throught when an error happens early on in the chain
// since the latter functions assume that 'everything is ok' since the errors were handled
// asyncAdd(2,'dsd').then((result)=>{
// 	console.log(`1st result: ${result}`);
// 	return asyncAdd(result, 'sdf'); // chain another promise
// }, (errorMessage)=>{
// 	console.error(errorMessage);
// })
// .then((result)=>{ // handle the 2nd promise
// 	console.log(`2nd result: ${result}`);
// 	return asyncAdd(result, 'vdfvd'); // chain another promise
// }, (errorMessage)=>{
// 	console.error(errorMessage);
// })
// .then((result)=>{ // handle the 3rd promise
// 	console.log(`3rd result: ${result}`);
// }, (errorMessage)=>{
// 	console.error(errorMessage);
// });

// CORRECT PATTERN FOR PROMISE CHAINING - use one error handler at the end
asyncAdd(2,3)
.then((result)=>{
	console.log(`1st result: ${result}`);
	return asyncAdd(result, 5); // 2nd promise
})
.then((result)=>{ // handle the 2nd promise
	console.log(`2nd result: ${result}`);
	return asyncAdd(result, 5); // 3rd promise
})
.then((result)=>{ // handle the 3rd promise
	console.log(`3rd result: ${result}`);
}).catch((errorMessage)=>{
	console.error(errorMessage);
});