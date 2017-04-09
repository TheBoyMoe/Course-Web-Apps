/*

	There are 2 types of event in node
	- system events - from c++ core - libuv, e.g finished reading a file, finished download
	- custom events - from js core - these you can create yourself  - part of the Event Emitter
	
	Often we wrap c++ functions in js to make it easier to use - often when an event occurs in libuv it will generate a custom event
	
 */
 

 