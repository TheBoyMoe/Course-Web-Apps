"use strict";
// const expect = require('chai').expect;
const {expect} = require('chai');


const titleCase = (str)=>{
	return str.split(' ').map((word)=>{
		return word.replace(word[0], word[0].toUpperCase());
	}).join(' ');
};

expect(titleCase('the great mouse detective')).to.be.a('string');
expect(titleCase('the great mouse detective')).to.equal('The Great Mouse Detective');