function Playlist() {
	this.songs  = [];
	this.nowPlayingIndex = 0;
}

Playlist.prototype.add = function (song) {
	this.songs.push(song);
};

Playlist.prototype.play = function () {
	let currentSong = this.songs[this.nowPlayingIndex];
	currentSong.play();
};

Playlist.prototype.stop = function () {
	let currentSong = this.songs[this.nowPlayingIndex];
	currentSong.stop();
};

Playlist.prototype.next = function () {
	this.stop(); // stop the current song
	this.nowPlayingIndex++; // move to the next song in the array
	if(this.nowPlayingIndex === this.songs.length){
		// reached the end, play from the first song
		this.nowPlayingIndex = 0;
	}
	this.play();
};

Playlist.prototype.renderElement = function (list) {
	// clear any songs, iterate over the [playlist and display the songs
	list.innerHTML = '';
	this.songs.forEach(function (song, i) {
		// build the song list, appending each song in turn
		list.innerHTML += song.toHTML();
	})
};