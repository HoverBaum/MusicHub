//Some usefull things
var get = function(id){ return document.getElementById(id) };
var songs = [];
var adrian = [
        {
            artist: "Adrian von Ziegler",
            title: "Welcome Home",
            file: "songs/WelcomeHome.mp3",
			link: ""
        },
        {
            artist: "Adrian von Ziegler",
            title: "WolfBlood",
            file: "songs/WolfBlood.mp3",
			link: ""
        },
        {
            artist: "Adrian von Ziegler",
            title: "Alvae",
            file: "songs/Alvae.mp3",
			link: ""
        },
        {
            artist: "Adrian von Ziegler",
            title: "Legend",
            file: "songs/Legend.mp3",
			link: "https://www.youtube.com/watch?v=yj_wyw6Xrq4&list=TLNn_QyL47qqxJGO3rVb_Te6fwGNrvziZh"
        }
    ];

var NCS = [
	{
		artist: "Luke Carpenter & John Ross",
		title: "California",
		file: "songs/California.mp3",
		link: ""
	},
	{
		artist: "Tobu",
		title: "Life",
		file: "songs/Life.mp3",
		link: ""
	},
	{
		artist: "Janji",
		title: "Together",
		file: "songs/Together.mp3",
		link: ""
	},
	{
		artist: "OLWK",
		title: "Taking Over",
		file: "songs/TakingOver.mp3",
		link: ""
	}
]

//index of currently played song.
var index = 0;
var interval;

//Start the player
function startPlayer() {
	songs = NCS;
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
	document.body.addEventListener("keypress", globalKeypress, false);
	
	children = get("playlist-links").childNodes;
	for(var i = 0; i < children.length; i++) {
		if(children[i].tagName === 'A') {
			var a = children[i];
			a.addEventListener("click", listSelect(a));
		}
	}
}

//Set the list of a clicked link as the current list.
function listSelect(a) {
	return function(e) {
		e.preventDefault();
		var list = a.getAttribute("data-list");
		eval("songs = " + list + ";", 0);
		index = songs.length;
		forward();
		initPlaylistDisplay();
	}
}

//Handles keypresses on a global scale.
function globalKeypress(e) {
	if(!(e.keyCode === 32)) {
		return false;
	}
	playPause(e);
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
    if(song.link === "") {
		get("artist").innerHTML = song.artist;
	} else {
		var a = document.createElement("a");
		a.setAttribute("href", song.link);
		a.innerHTML = song.artist;
		get("artist").innerHTML = "";
		get("artist").appendChild(a);
	}
    get("song").innerHTML = song.title;
	index = songs.indexOf(song);
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
	cnt.innerHTML = "";
    for(var i = 0; i < songs.length; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "song");
        var a = document.createElement("a");
        a.innerHTML = songs[i].artist + " - " + songs[i].title;
        (function(i) {
                a.addEventListener("click", function() {
               // console.log(songs[i]);
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


//
//***************************************************************************************************************
//	Things needed to change the backgorund

//Initializes the change of the backgorund by adding click-listener
function initBackgroundChange() {
	var children = get("images").children;
	for (var i = 0; i < children.length; i++) {
		//Now do something for children that are images.
		if(children[i] instanceof HTMLImageElement) {
			children[i].addEventListener("click", function() {
				//Remember the context now, so this is the image
				return setBackgroundImage(this.getAttribute("src"));	
			})
		}
	}
}

//sets the backgorund image using the given source.
function setBackgroundImage(src) {
	//console.log(src);
	document.body.style.backgroundImage = 'url("' + src + '")';
}