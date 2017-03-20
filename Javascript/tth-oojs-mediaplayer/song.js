function Song(title, artist, duration) {
	// call the Media constructor, using it to set the props the objs share
	Media.call(this, title, duration);
	this.artist = artist;
}

// create the prototype chain, Song will inherit the methods bond to Media.prototype
Song.prototype = Object.create(Media.prototype);

// Define any methods unique to Song objs
Song.prototype.toHTML = function () {
	let htmlString = '<li';
	if(this.isPlaying){
		htmlString += ' class="current"';
	}
	htmlString += '>';
	htmlString += this.title;
	htmlString += ' - ';
	htmlString += this.artist;
	htmlString += '<span class="duration">';
	htmlString += this.duration;
	htmlString += '</span></li>';
	return htmlString;
};