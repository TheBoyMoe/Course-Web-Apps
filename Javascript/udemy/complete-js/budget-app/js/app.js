/**
 * Created by theboymo on 15/03/17.
 */

// MODEL
let budgetController = (function () {
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
let uiController = (function () {
	// more to come...
	
	
})();

// APP CONTROLLER -- connects the other two modules
let appController = (function (budgetCtrl, uiCtrl) {
	let a = budgetCtrl.api(5);
	
	return {
		anotherApi: function () {
			return a;
		}
	}
	
})(budgetController, uiController);
