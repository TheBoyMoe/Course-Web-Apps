function Emitter() {
	this.events = {};
}

// listener === callback - every time .on() is called a callback function is added to
// the events obj array - events can have diff event types with arrays for each
Emitter.prototype.on = function (type, listener) {
	// if there is no prop, assign an empty array
	this.events[type] = this.events[type] || [];
	this.events[type].push(listener);
};

// iterate over the array, invoking the listeners, in sequence
Emitter.prototype.emit = function (type) {
	if(this.events[type]){
		this.events[type].forEach((listener)=>{
			listener();
		})
	}
};

module.exports = Emitter;