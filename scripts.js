// Define a constant array of tracks
const trackList = [
    
    {
      title: "Black Hearted",
      artist: "Polo G",
      audioSrc: "black-heart.mp3",
      albumCoverSrc: "polo.jpeg",
      lyrics: "ian is sad im ok whe4r are tyoun now when i need you the mosy im not ok i need yoir help, wher."
    },
    {
      title: "Break",
      artist: "Shiek",
      audioSrc: "shiek.mp3",
      albumCoverSrc: "shiek.jpg",
      lyrics: "Lyrics for Track 1..."
    },
    {
      title: "Are you sure",
      artist: "Loote",
      audioSrc: "sure.mp3",
      albumCoverSrc: "loote.jpeg",
      lyrics: "Lyrics for Track 3..."
    },
    {
      title: "True love",
      artist: "SRTW ft.CLOSR",
      audioSrc: "loved.mp3",
      albumCoverSrc: "True.jpeg",
      lyrics: "..."
    },
    {
      title: "My Girl",
      artist: "Oskar Cyms ",
      audioSrc: "days.mp3",
      albumCoverSrc: "girl.jpeg",
      lyrics: "Lyrics for Track 3..."
    },
    {
      title: "Homebody",
      artist: "DĖMI, Madman Stan",
      audioSrc: "home.mp3",
      albumCoverSrc: "demi.jpg",
      lyrics: "Lyrics for Track 3..."
    },
    {
      title: "Mama",
      artist: "Jonas Blue",
      audioSrc: "Jonas Blue – Mama mp3.mp3",
      albumCoverSrc: "jonas.jpeg",
      lyrics: "Lyrics for Track 3..."
    },
    {
      title: "Look at me habibi",
      artist: "Rakhim",
      audioSrc: "look.mp3",
      albumCoverSrc: "rakhim.jpg",
      lyrics: "Lyrics for Track 3..."
    },
    {
      title: "Paris",
      artist: "Chainsmokers",
      audioSrc: "y2mate.is - The Chainsmokers - Paris Lyrics -Kcz2BnDpUpA-192k-1688086583.mp3",
      albumCoverSrc: " paris.png",
      lyrics: "Lyrics for Track 3..."
    },

    // Add more tracks as needed
  ];





  // DOM elements
  const audio = document.getElementById("audio");
  const albumCover = document.getElementById("album-cover");
  const songTitle = document.getElementById("song-title");
  const artist = document.getElementById("artist");
  const progressBar = document.getElementById("progress-bar");
  const timestamp = document.getElementById("timestamp");
  const playButton = document.getElementById("play");
  const nextButton = document.getElementById("next");
  const prevButton = document.getElementById("prev");
  const heartIcon = document.getElementById("heart-icon");
  const toggleButton = document.getElementById("toggle-button");
  const playIcon = document.getElementById("play-icon");
  const pauseIcon = document.getElementById("pause-icon");


  heartIcon.addEventListener("click", () => {
    heartIcon.classList.toggle("liked");
  });
  


  let isDragging = false;

  // Add mousedown event listener to start dragging
  progressBar.addEventListener("mousedown", (e) => {
    isDragging = true;
    updateProgress(e);
  });
  
  // Add mousemove event listener to update progress while dragging
  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      updateProgress(e);
    }
  });
  
  // Add mouseup event listener to stop dragging
  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
  
  // Function to update progress based on mouse position
  function updateProgress(e) {
    if (!isDragging) return;
  
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = progressBar.offsetWidth;
    const percent = (offsetX / width) * 100;
  
    const seekTime = (percent / 100) * audio.duration;
    audio.currentTime = seekTime;
  }


  
  // Track index
  let currentTrackIndex = 0;
  
  // Function to update the audio player with track details
  function loadTrack(trackIndex) {
    const track = trackList[trackIndex];
    audio.src = track.audioSrc;
    albumCover.src = track.albumCoverSrc;
    songTitle.textContent = track.title;
    artist.textContent = track.artist;
    audio.load();
  }
  
 // Play and pause functionality
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audio.pause();
    playButton.innerHTML = '<i class="fas fa-play"></i>';
  }
}

  
  // Event listener for the play/pause button
  playButton.addEventListener("click", togglePlay);
  
  // Next track functionality
  function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % trackList.length;
    loadTrack(currentTrackIndex);
    togglePlay();
  }
  
  // Event listener for the next button
  nextButton.addEventListener("click", nextTrack);
  
  // Previous track functionality
  function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + trackList.length) % trackList.length;
    loadTrack(currentTrackIndex);
    togglePlay();
  }
  
  // Event listener for the previous button
  prevButton.addEventListener("click", prevTrack);
  
  // Update progress bar and timestamp as the audio plays
  audio.addEventListener("timeupdate", () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.value = progressPercent;
    const formattedTime = formatTime(currentTime) + " / " + formatTime(duration);
    timestamp.textContent = formattedTime;
  });
  
  // Format time in MM:SS format
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
  
  // Initialize with the first track
  loadTrack(currentTrackIndex);
  
  // Repeat functionality (toggle between repeat and no-repeat)
  const repeatButton = document.getElementById("repeat");
  let isRepeat = false;
  
  repeatButton.addEventListener("click", () => {
    isRepeat = !isRepeat;
    if (isRepeat) {
      repeatButton.classList.add("active");
    } else {
      repeatButton.classList.remove("active");
    }
  });
  
  // Event listener for when the audio ends
  audio.addEventListener("ended", () => {
    if (isRepeat) {
      audio.currentTime = 0;
      audio.play();
    } else {
      nextTrack();
    }
  });
  
  // Volume control
  const volumeIcon = document.getElementById("volume-icon");
  const volumeSlider = document.getElementById("volume-slider");
  
  volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
    updateVolumeIcon();
  });
  
  function updateVolumeIcon() {
    if (audio.volume === 0) {
      volumeIcon.className = "fas fa-volume-mute";
    } else if (audio.volume < 0.5) {
      volumeIcon.className = "fas fa-volume-down";
    } else {
      volumeIcon.className = "fas fa-volume-up";
    }
  }
  

heartIcon.addEventListener("click", () => {
  heartIcon.classList.toggle("liked");
});



function toggleAudio(audioId) {
  const audio = document.getElementById(audioId);

  if (audio.paused) {
      audio.play();
  } else {
      audio.pause();
  }
}




document.addEventListener("DOMContentLoaded", function () {
  // Get the query parameter from the URL
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  // Check if the "songInfo" parameter is present
  if (urlParams.has("songInfo")) {
      // Decode and parse the songInfo parameter
      const songInfoParam = decodeURIComponent(urlParams.get("songInfo"));
      const songInfo = JSON.parse(songInfoParam);

      // Update the content with the song information
      const albumCover = document.getElementById("album-cover");
      const songTitle = document.getElementById("song-title");
      const artist = document.getElementById("artist");
      const audio = document.getElementById("audio");

      albumCover.src = songInfo.image;
      songTitle.textContent = songInfo.title;
      artist.textContent = songInfo.artist;
      audio.src = songInfo.audio;
  }
});



document.addEventListener('DOMContentLoaded', function () {
  // Retrieve the selected song from localStorage
  const selectedSong = localStorage.getItem('selectedSong');

  // Get the audio element
  const audioElement = document.getElementById('audio');

  if (selectedSong) {
      // Set the src attribute of the audio element to the selected song
      audioElement.src = selectedSong;

      // Play the audio
      audioElement.play();
  }
});



document.addEventListener('DOMContentLoaded', function () {
  // Parse the query parameters from the URL
  const queryParams = new URLSearchParams(window.location.search);

  // Define a mapping of song IDs to song details
  const songDetails = {
      1: {
          audioSource: 'shiek.mp3',
          imageSource: 'shiek.jpg',
          name: 'Break',
          artist: 'Shiek',
      },
      2: {
          audioSource: 'black-heart.mp3',
          imageSource: 'polo.jpeg',
          name: 'Black Hearted',
          artist: 'Polo G',
      },
      3: {
        audioSource: 'Jonas Blue – Mama mp3.mp3',
        imageSource: 'jonas.jpeg',
        name: 'Mama',
        artist: 'Jonas Blue',
    },
      4: {
        audioSource: 'sure.mp3',
        imageSource: 'loote.jpeg',
        name: 'Are you sure',
        artist: 'Loote',
    },
    5: {
      audioSource: 'look.mp3',
      imageSource: 'Rakhim.jpg',
      name: 'look at me habibi',
      artist: 'Rakhim',
  },
  6: {
    audioSource: 'y2mate.is - The Chainsmokers - Paris Lyrics -Kcz2BnDpUpA-192k-1688086583.mp3',
    imageSource: 'paris.png',
    name: 'Paris',
    artist: 'Chainsmokers',
},
      // Add more song details as needed
  };

  // Get the song ID from the query parameters
  const songId = queryParams.get('songId');

  // Retrieve the corresponding song details
  const song = songDetails[songId];

  if (song) {
      // Set up the audio element
      const audioElement = document.getElementById('audio');
      audioElement.src = song.audioSource;

      // Set up the image element
      const imageElement = document.getElementById('album-cover');
      imageElement.src = song.imageSource;

      // Set up the song title
      const songTitle = document.getElementById('song-title');
      songTitle.textContent = song.name;

      const artistName = document.getElementById('artist');
      artistName.textContent = song.artist;

      // Play the audio
      audioElement.play();
  }
});

// ...

// ...



