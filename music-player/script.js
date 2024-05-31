let currentTrack = document.createElement('audio');
let trackIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let updateTimer;

const trackList = [
    {
        name: "Sample Track 1",
        artist: "Sample Artist 1",
        image: "./assets/images/album1.jpg",
        path: "./assets/music/track1.mp3"
    },
    {
        name: "Sample Track 2",
        artist: "Sample Artist 2",
        image: "./assets/images/album2.jpg",
        path: "./assets/music/track2.mp3"
    }
];

function loadTrack(index) {
    clearInterval(updateTimer);
    resetValues();
    
    currentTrack.src = trackList[index].path;
    currentTrack.load();
    
    document.querySelector(".track-art img").src = trackList[index].image;
    document.querySelector(".track-name").textContent = trackList[index].name;
    document.querySelector(".track-artist").textContent = trackList[index].artist;
    document.querySelector(".now-playing").textContent = `PLAYING ${index + 1} OF ${trackList.length}`;
    
    updateTimer = setInterval(seekUpdate, 1000);
    currentTrack.addEventListener("ended", nextTrack);
}

function resetValues() {
    document.querySelector(".current-time").textContent = "00:00";
    document.querySelector(".total-duration").textContent = "00:00";
    document.querySelector(".seek_slider").value = 0;
}

function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    currentTrack.play();
    isPlaying = true;
    document.querySelector(".playpause-track i").classList.replace("fa-play-circle", "fa-pause-circle");
}

function pauseTrack() {
    currentTrack.pause();
    isPlaying = false;
    document.querySelector(".playpause-track i").classList.replace("fa-pause-circle", "fa-play-circle");
}

function nextTrack() {
    if (isShuffle) {
        trackIndex = Math.floor(Math.random() * trackList.length);
    } else {
        trackIndex = (trackIndex + 1) % trackList.length;
    }
    loadTrack(trackIndex);
    playTrack();
}

function prevTrack() {
    trackIndex = (trackIndex - 1 + trackList.length) % trackList.length;
    loadTrack(trackIndex);
    playTrack();
}

function seekTo() {
    let seekto = currentTrack.duration * (document.querySelector(".seek_slider").value / 100);
    currentTrack.currentTime = seekto;
}

function setVolume() {
    currentTrack.volume = document.querySelector(".volume_slider").value / 100;
}

function seekUpdate() {
    let seekPosition = 0;
    
    if (!isNaN(currentTrack.duration)) {
        seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
        document.querySelector(".seek_slider").value = seekPosition;

        let currentMinutes = Math.floor(currentTrack.currentTime / 60);
        let currentSeconds = Math.floor(currentTrack.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(currentTrack.duration / 60);
        let durationSeconds = Math.floor(currentTrack.duration - durationMinutes * 60);
        
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
        
        document.querySelector(".current-time").textContent = currentMinutes + ":" + currentSeconds;
        document.querySelector(".total-duration").textContent = durationMinutes + ":" + durationSeconds;
    }
}

function shuffleTrack() {
    isShuffle = !isShuffle;
    document.querySelector(".shuffle-track").classList.toggle("active", isShuffle);
}

function repeatTrack() {
    isRepeat = !isRepeat;
    document.querySelector(".repeat-track").classList.toggle("active", isRepeat);
    currentTrack.loop = isRepeat;
}

loadTrack(trackIndex);
