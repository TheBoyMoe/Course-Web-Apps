/**
 * Created by theboymo on 15/03/17.
 */

// MODEL
const budgetController = (() => {
	let x = 23;
	
	let add = function (a) {
		return x + a;
	};
	
	return {
		api: function (b) {
			return add(b);
		}
	}
	
})();

// VIEW
const uiController = (() => {
	'use strict';
	return {
		prop: 6,
		api: () => {
			return `Hello from the UI Controller`;
		}
	}
	
})();

// APP CONTROLLER -- connects the other two modules
const appController = ((budgetCtrl, uiCtrl) => {
	'use strict';
	let a = budgetCtrl.api(5);
	let b = uiCtrl.api();
	let c = uiCtrl.prop;
	return {
		budgetApi: () => {
			return a;
		},
		uiApi: () => {
			return `${b} ${c}`;
		}
	}
	
})(budgetController, uiController);
