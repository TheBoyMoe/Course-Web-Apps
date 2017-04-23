'use strict';
const axon = require('axon');
const socket = axon.socket('pub');

socket.bind(8000);

/**
 * Send a badge to the publish socket
 * @param {model} badge
 */
const send = (badge)=>{
	socket.send(badge);
};

module.exports = {
	send
};