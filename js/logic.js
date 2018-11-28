// Shared area for the video and audio object objects
var fanpageshared = {

	// Audio object
	audio: "",
	audioPlaying: false,
	
	// Video object
	video: "",
	playerPlaying: false,
  
	// Function to pause/stop the video player
	pauseVideo: function () { 
		//console.log("pauseVideo: " + this.video);
		this.video.pauseVideo();
	},

	// Function to pause the audio player
	pauseAudio: function () {
		//console.log("pauseAudio: " + audio);
		this.audio.pause();
	}
}

// This function dynamically creates an <iframe> tag and YouTube player
function onYouTubeIframeAPIReady() {
	//console.log("onYouTubeIframeAPIReady: fired!!!");
	fanpageshared.video = new YT.Player('player', {
		height: '385',
		width: '100%',
		videoId: 'MgaETQh4uXg',
		playerVars: {
			'autoplay': 0,
			'controls': 0,
			'showinfo': 0,
			'rel': 0
		},
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

// Callback function when the video player is ready.
function onPlayerReady(event) {
	//console.log("onPlayerReady: fired!!!");
}

// Callback function when the video player state changes.
function onPlayerStateChange(event) {

	// Player states
	// YT.PlayerState.ENDED
	// YT.PlayerState.PLAYING
	// YT.PlayerState.PAUSED
	// YT.PlayerState.BUFFERING
	// T.PlayerState.CUED
	
	//console.log("onPlayerStateChange event.data=" + event.data);

	if (event.data == YT.PlayerState.PLAYING) {
		fanpageshared.playerPlaying = true;				
		if (fanpageshared.audioPlaying)
			fanpageshared.pauseAudio();
	} else		
		fanpageshared.playerPlaying = false;
}

//
// Function to run when the DOM is ready to rumble...
//
$( document ).ready(function($) {
  
	//
	// Setup a timer to display a different Band image every 3 seconds
	//
	$("#slideshow > div:gt(0)").hide();
	setInterval(function() { 
	$('#slideshow > div:first')
		.fadeOut(1000)
		.next()
		.fadeIn(1000)
		.end()
		.appendTo('#slideshow');
	},  3000);
  

	// Get the audio dom element	  
	fanpageshared.audio = document.querySelector('audio');

	// Register callback function when the audio player starts.
	fanpageshared.audio.addEventListener('play', function() {
	if (fanpageshared.playerPlaying)
		fanpageshared.pauseVideo();
		fanpageshared.audioPlaying = true;
	});

	// Register callback function when the audio player ia paused.
		fanpageshared.audio.addEventListener('pause', function() {
		fanpageshared.audioPlaying = false;
	});

});
