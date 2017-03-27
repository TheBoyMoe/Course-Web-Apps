/**
 * Created by theboymo on 15/03/17.
 */

// MODEL
const budgetController = (() => {
	'use strict';
	// let x = 23;
	//
	// let add = function (a) {
	// 	return x + a;
	// };
	//
	// return {
	// 	api: function (b) {
	// 		return add(b);
	// 	}
	// }
	
	
	
})();

// VIEW
const uiController = (() => {
	'use strict';
	// return {
	// 	prop: 6,
	// 	api: () => {
	// 		return `Hello from the UI Controller`;
	// 	}
	// }
	
	
	
})();

// APP CONTROLLER -- connects the other two modules
const appController = ((budgetCtrl, uiCtrl) => {
	'use strict';
	// let a = budgetCtrl.api(5);
	// let b = uiCtrl.api();
	// let c = uiCtrl.prop;
	// return {
	// 	budgetApi: () => {
	// 		return a;
	// 	},
	// 	uiApi: () => {
	// 		return `${b} ${c}`;
	// 	}
	// }
	
	// define the event listener on the add button
	document.querySelector('.add__btn').addEventListener('click', ()=>{
		console.log(`Add button was clicked`);
		// 1. fetch user input from field
		// 2. add item to the budget controller
		// 3. add item to the ui
		// 4. calculate the budget
		// 5. display the budget
		
		
	});
	
})(budgetController, uiController);
