// Create a playlist, adding a few songs
let playlist = new Playlist();
playlist.add(new Song('Fly Me to the Moon', 'Frank Sinatra', '3:24'));
playlist.add(new Song('The Best is Yet to Come', 'Frank Sinatra', '3:19'));

// render the playlist to the screen
let container = document.getElementById('playlist');
playlist.renderElement(container);

// set the event listeners on the btns
let playBtn = document.getElementById('play');
let stopBtn = document.getElementById('stop');
let nextBtn = document.getElementById('next');

playBtn.onclick = function () {
	playlist.play();
	playlist.renderElement(container); // refresh the ui
};

stopBtn.onclick = function () {
	playlist.stop();
	playlist.renderElement(container);
};

nextBtn.onclick = function () {
	playlist.next();
	playlist.renderElement(container);
};