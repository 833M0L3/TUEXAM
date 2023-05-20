function random_playlist(ids)
{
  
return ids[Math.floor(Math.random()*ids.length)];
     
}

var ids = ["PLcmGsFuGettOwVTuZiVwvwG_adh_zZw3T", "PLcmGsFuGettM1RQAg1rNrAACVLBmIZ_pW", "PLPqPoUbjz1wjKhgbWeiGFg1P3f9X7amvY"];

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

function playVideo() {
  player.playVideo();
  player.setLoop(true);
  player.setVolume(50);
}

document.addEventListener('click', playVideo);

function Titledata () {
  var videoData = player.getVideoData();
  currentlyplaying = videoData.title
  player.playVideo();
  document.getElementById('playing1').innerHTML = currentlyplaying
}

setInterval(Titledata, 1000);
player.setLoop(true);
