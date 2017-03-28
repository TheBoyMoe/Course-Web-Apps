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
	let DOMStrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value'
	};
	
	// functions defined in the UIController that are called from
	// the AppController must be exported - by default all methods
	// and props of the module are private
	return {
		getInput: () => {
			return {
				value: document.querySelector(DOMStrings.inputValue).value,
				type: document.querySelector(DOMStrings.inputType).value, // either 'inc'/'exp'
				description: document.querySelector(DOMStrings.inputDescription).value
			}
		}
	}
	
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
	
	// called by either hitting the 'Enter' key or the 'add item' btn
	const ctrlAddItem = () => {
		// 1. fetch user input from field
		let input = uiCtrl.getInput();
		console.log(input);
		// 2. add item to the budget controller
		// 3. add item to the ui
		// 4. calculate the budget
		// 5. display the budget
		
		console.log('CtrlAddItem');
	};
	
	// define the event listener on the add button
	document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
	
	// add an event listener to the global doc element to capture pressing the enter key
	// keypress - every key except fn, Ctrl
	document.addEventListener('keypress', (e)=>{
		if(e.keyCode === 13 || e.which === 13) {
			ctrlAddItem();
		}
	});
	
	
})(budgetController, uiController);
