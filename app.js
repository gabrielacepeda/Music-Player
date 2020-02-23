const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Song Titles
const songs = [
  "Cyanide",
  "Nature Feels",
  "Party",
  "Drop",
  "Rock With You",
  "Wanna Love You Girl"
];
const artists = [
  "Daniel Caesar",
  "Frank Ocean",
  "Beyonce",
  "The Pharcyde",
  "Michael Jackson",
  "Robin Thicke"
];

// Keep track of song
let songIndex = 1;
let artistIndex = 1;

// Initially load song details into DOM
loadSong(songs[songIndex], artists[artistIndex]);

// Update song details
function loadSong(song, artist) {
  title.innerText = song + ` - ${artist}`;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpeg`;
}

// Play Song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

// Pause Song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

function prevSong() {
  songIndex--;
  artistIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
    artistIndex = artists.length - 1;
  }
  loadSong(songs[songIndex], artists[artistIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  artistIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
    artistIndex = 0;
  }
  loadSong(songs[songIndex], artists[artistIndex]);
  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offSetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change Song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// click on progress bar
progressContainer.addEventListener("click", setProgress);

// Songs ends
audio.addEventListener("ended", nextSong);
