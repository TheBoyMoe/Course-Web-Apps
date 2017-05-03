'use strict';
const {expect} = require('chai');

const titleCase = (title)=>{
    let words = title.split(' ');
    return words.map((word, i)=>{
        if(((word === 'a') || (word === 'of') || (word === 'on') || (word === 'the')) && i !== 0)
            return word;
        return word[0].toUpperCase() + word.substring(1);
    }).join(' ');
};

expect(titleCase('avengers assemble')).to.be.a('string');
expect(titleCase('a')).to.equal('A');
expect(titleCase('vertigo')).to.equal('Vertigo');
expect(titleCase('darkness on the edge of town')).to.equal('Darkness on the Edge of Town');