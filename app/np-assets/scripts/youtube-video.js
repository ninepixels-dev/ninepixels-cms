// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('videoPlayer', {
        videoId: 'uNWB5N-Sq9Q',
        playerVars: {
            loop: 1,
            playlist: 'uNWB5N-Sq9Q',
            controls: 0,
            showinfo: 0
        }
    });
}

function playVideo() {
    try {
        player.setPlaybackQuality('hd1080');
        player.playVideo();
    } catch (err) {
    }
}
