// import multiple modules, export as a single object

const english = require('./english');
const spanish = require('./spanish');

module.exports = {
	eng: english,
	esp: spanish
};
