'use strict';

// either reject or resolve will be called once - each take a single argument, can be anything??
// a promise can only be fulfilled once - it can't be called twice.
// Until it is fulfilled it is a 'pending' state
// It is considered fulfilled when it has either been fulfilled or rejected
const SomePromise = new Promise((resolve, reject)=>{
	setTimeout(()=>{
		// resolve('it worked!'); // resolve handles successes
		reject('unable to fulfill request'); // handles errors
	}, 2000);
});

// 1st arg handles success, 2nd arg handles errors
SomePromise.then((message)=>{
	console.log(`Success ${message}`);
}, (errorMessage)=>{
	console.error(`Failure ${errorMessage}`);
});