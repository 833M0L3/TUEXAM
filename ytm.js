var nextButton = document.getElementById('next');
var previousButton = document.getElementById('previous');
var switchPlaylistButton = document.getElementById('switchPlaylist');

nextButton.addEventListener('click', nextVideo);
previousButton.addEventListener('click', previousVideo);
switchPlaylistButton.addEventListener('click', switchPlaylist);


function random_playlist(ids)
{
  
return ids[Math.floor(Math.random()*ids.length)];
     
}

var ids = ["PLcmGsFuGettOwVTuZiVwvwG_adh_zZw3T", "PLcmGsFuGettM1RQAg1rNrAACVLBmIZ_pW", "PLPqPoUbjz1whK4V92rrlICyxSsa3BaElM"];

let currentID = random_playlist(ids)


var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '0',
    width: '0',
    playerVars: {
      listType: 'playlist',
      list: currentID,
      'playsinline': 1,
      'autoplay': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
  event.target.setVolume(20);
}


// Toggle popup visibility on volume button click
document.getElementById('volumeButton').addEventListener('click', function (event) {
  event.stopPropagation(); // Prevents the event from bubbling up
  const volumePopup = document.getElementById('volumePopup');
  volumePopup.style.display = volumePopup.style.display === 'none' || volumePopup.style.display === '' ? 'block' : 'none';
});

// Update player volume based on slider
document.getElementById('volumeSlider').addEventListener('input', function () {
  let volume = parseInt(this.value);
  player.setVolume(volume); // Make sure player object is defined and can accept setVolume method
});

// Close popup when clicking outside of it
document.addEventListener('click', function(event) {
  const volumePopup = document.getElementById('volumePopup');
  const volumeButton = document.getElementById('volumeButton');
  if (!volumePopup.contains(event.target) && event.target !== volumeButton) {
    volumePopup.style.display = 'none';
  }
});

const volumePopup = document.getElementById('volumePopup');
volumePopup.style.display = 'none';

var done = false;
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    player.playVideo(); 
}
}

function onPlayerReady(event) {
  // Get the total number of videos in the playlist
  var playlistId = currentID;
  songs = player.getPlaylist(playlistId, function(playlist) {
  });
  songs = songs.length;
  num = Math.floor(Math.random() * songs);
  console.log('Fetched successfully', songs);
  setTimeout(() => {
    player.playVideoAt(num);
  }, 5);
}


function nextVideo() {
  player.nextVideo();
}


function previousVideo() {
  player.previousVideo();
}

function switchPlaylist() {
  currentID = random_playlist(ids);
  player.loadPlaylist({
    listType: 'playlist',
    list: currentID,
    'playsinline': 1,
    'autoplay': 1
  });
}



function Titledata() {
  var videoData = player.getVideoData();
  var currentlyplaying = videoData.title;
  var currentTime = player.getCurrentTime();
  var duration = player.getDuration();
  var formattedCurrentTime = YTIME(currentTime);
  var formattedDuration = YTIME(duration);

  var timeText = formattedCurrentTime + " / " + formattedDuration;

  player.playVideo();
  document.getElementById('playing1').innerHTML = currentlyplaying;
  document.getElementById('timeText').innerHTML = timeText;
}

function YTIME(time) {
  var minutes = Math.floor(time / 60);
  var seconds = Math.floor(time % 60);
  var formattedTime = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  return formattedTime;
}

setInterval(Titledata, 1000);
player.setLoop(true);