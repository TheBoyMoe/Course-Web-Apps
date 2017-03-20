function Movie(title, year, duration) {
	// 'borrow' the Media constructor to set the props the two objs share
	Media.call(this, title, duration);
	this.year = year;
}

// create the prototype chain, inheriting the Media objs methods
Movie.prototype = Object.create(Media.prototype);

Movie.prototype.toHTML = function () {
	let htmlString = '<li';
	if(this.isPlaying){
		htmlString += ' class="current"';
	}
	htmlString += '>';
	htmlString += this.title;
	htmlString += ' (';
	htmlString += this.year;
	htmlString += ') ';
	htmlString += '<span class="duration">';
	htmlString += this.duration;
	htmlString += '</span></li>';
	return htmlString;
};