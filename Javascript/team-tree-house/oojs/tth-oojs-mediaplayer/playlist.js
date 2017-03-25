function Playlist() {
	this.items = [];
	this.nowPlayingIndex = 0;
}

Playlist.prototype.add = function (item) {
	this.items.push(item);
};

Playlist.prototype.play = function () {
	let currentItem = this.items[this.nowPlayingIndex];
	currentItem.play();
};

Playlist.prototype.stop = function () {
	let currentItem = this.items[this.nowPlayingIndex];
	currentItem.stop();
};

Playlist.prototype.next = function () {
	this.stop();
	this.nowPlayingIndex++;
	if(this.nowPlayingIndex === this.items.length){
		this.nowPlayingIndex = 0;
	}
	this.play();
};

Playlist.prototype.renderElement = function (container) {
	// clear any items from the screen
	container.innerHTML = '';
	// iterate through the playlist and re-build the display
	this.items.forEach(function (item) {
		container.innerHTML += item.toHTML();
	})
};