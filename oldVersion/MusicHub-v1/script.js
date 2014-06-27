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
	get("player").volume = 0.2;
    setPlayingSong(songs[0]);
    interval = setInterval(progress, 15);
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
}