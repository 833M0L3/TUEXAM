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
      list: 'PLcmGsFuGettOwVTuZiVwvwG_adh_zZw3T',
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

var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
  if (event.data === YT.PlayerState.ENDED) {
    player.playVideo(); 
}
}

function onPlayerReady(event) {
  // Get the total number of videos in the playlist
  var playlistId = 'PLcmGsFuGettOwVTuZiVwvwG_adh_zZw3T';
  songs = player.getPlaylist(playlistId, function(playlist) {
  });
  songs = songs.length;
  num = Math.floor(Math.random() * songs);
  setTimeout(() => {
    player.playVideoAt(num);
  }, 5);
}

function playVideo() {
  player.playVideo();
}

document.getElementById("days").addEventListener("mouseover", mouseOver);

document.addEventListener('click', playVideo);

function mouseOver() {
  setTimeout(() => {
    player.playVideo();
  }, 2);
}
