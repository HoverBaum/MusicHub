//Some usefull things
var get = function(id){ return document.getElementById(id) };
var songs = [
        {
            artist: "Adrian von Ziegler",
            title: "Welcome Home",
            file: "songs/WelcomeHome.mp3"
        },
        {
            artist: "Adrian von Ziegler",
            title: "WolfBlood",
            file: "songs/WolfBlood.mp3"
        },
        {
            artist: "Adrian von Ziegler",
            title: "Alvae",
            file: "songs/Alvae.mp3"
        },
        {
            artist: "Adrian von Ziegler",
            title: "Legend",
            file: "songs/Legend.mp3"
        }
    ];
//index of currently played song.
var index = 0;
var interval;

//Start the player
function startPlayer() {
    registerHandlers();
    setPlayingSong(songs[0]);
    interval = setInterval(progress, 15);
    initPlaylistDisplay();
}

//Makes controls clickable.
function registerHandlers() {
    get("playpause").addEventListener("click", playPause, false);
    get("backward").addEventListener("click", backward, false);
    get("forward").addEventListener("click", forward, false);
}

//Play or pause depending on what we are doing right now.
function playPause(e) {
    var btn = get("playpause").children[0];
    var player = get("player");
    if(btn.getAttribute("class") === "fa fa-fw fa-pause") {
        btn.setAttribute("class", "fa fa-fw fa-play");
        player.pause();
    } else {
        btn.setAttribute("class", "fa fa-fw fa-pause");
        player.play();
    }
}

//One song backwrads
function backward() {
    index--;
    if(index < 0) {
        index = songs.length-1;
    }
    setPlayingSong(songs[index]);
}

//Next song
//Gets the next song and plays it.
function forward() {
    index++;
    if(index >= songs.length) {
        index = 0;
    }
    setPlayingSong(songs[index]);
}

//Sets a song to be played and updates GUI
function setPlayingSong(song) {
    //Update GUI
    var player = get("player");
    player.src = song.file;
    get("artist").innerHTML = song.artist;
    get("song").innerHTML = song.title;
    player.play();
}

//Called every second to update GUI and player.
function progress() {
    var player = get("player");
    if(player.currentTime >= player.duration-1) {
        forward();
    }
    var progress = (player.currentTime / player.duration) * 100;
    get("progress").setAttribute("value", progress);
	updateSound();
}

//Initializes the display of the current playlist.
function initPlaylistDisplay() {
    var cnt = get("playlist-container");
    for(var i = 0; i < songs.length; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "song");
        var a = document.createElement("a");
        a.innerHTML = songs[i].artist + " - " + songs[i].title;
        (function(i) {
                a.addEventListener("click", function() {
                console.log(songs[i]);
                return setPlayingSong(songs[i]);
            });
        })(i);
        div.appendChild(a);
        cnt.appendChild(div);
    }
}

//Updates the sound according to the input when called.
function updateSound() {
	var player = get("player");
	var vol = get("volume-input").value;
	vol = vol / 100;
	player.volume = vol;
}