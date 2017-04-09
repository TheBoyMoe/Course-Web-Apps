const uiCtrl = (()=>{
	"use strict";
	
	// private methods
	const multiply = (a, b)=>{
		return a*b;
	};
	
	const add = (a,b)=>{
		return a+b;
	};
	
	// public methods
	return {
		sum(a,b) {
			return add(a,b);
		},
		times(a,b) {
			return multiply(a,b);
		}
	}
	
})();

module.exports = uiCtrl;