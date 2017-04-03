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
	
	const Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};
	
	const Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};
	
	let data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		}
	};
	
	return {
		addItem(type, description, value) {
			// type will be either 'inc' or 'exp'
			// get the id of the last element in the array, increment to create the next id
			let ID = (data.allItems[type].length > 0)? data.allItems[type][data.allItems[type].length - 1].id + 1: 0;
			let newItem = (type === 'exp')? new Expense(ID, description, value): new Income(ID, description, value);
			
			// store the item in the data structure
			data.allItems[type].push(newItem);
			
			return newItem;
		},
		// remove in production, displays data structure content, otherwise not visible
		testing() {
			console.log(data);
		}
	}
	
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
	const DOMStrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn'
	};
	
	// functions defined in the UIController that are called from
	// the AppController must be exported - by default all methods
	// and props of the module are private
	return {
		getInput() {
			return {
				value: document.querySelector(DOMStrings.inputValue).value,
				type: document.querySelector(DOMStrings.inputType).value, // either 'inc'/'exp'
				description: document.querySelector(DOMStrings.inputDescription).value
			}
		},
		addListItem(item, type) {
			let html = '';
			if(type === 'inc') {
				html = `<div class="item clearfix" id="income-%id%">
                            <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;
			} else {
				html = `<div class="item clearfix" id="expense-%id%">
                            <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                                <div class="item__percentage">%percentage%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;
			}
		},
		getDOMStrings() {
			return DOMStrings; // export the DOM strings object so it's available to other modules
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
		// console.log(input);
		
		// 2. create exp/inc item, add it to the budget controller data store and return the item
		let netItem = budgetCtrl.addItem(input.type, input.description, input.value);
		
		// 3. add item to the ui
		// 4. calculate the budget
		// 5. display the budget
		
		console.log('CtrlAddItem');
	};
	
	const eventListenerSetup = () => {
		const DOM = uiCtrl.getDOMStrings();
		
		// define the event listener on the add button
		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
		
		// add an event listener to the global doc element to capture pressing the enter key
		// keypress - every key except fn, Ctrl
		document.addEventListener('keypress', (e)=>{
			if(e.keyCode === 13 || e.which === 13) {
				ctrlAddItem();
			}
		});
	};
	
	return {
		init() {
			console.log('Application has started');
			eventListenerSetup();
		}
	}
	
})(budgetController, uiController);

// launch the app
appController.init();