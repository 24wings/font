/** state 0 笔顺 1分笔 */

let state = 1;
let current = 1;
let videoEl = document.getElementsByTagName('video')[0];
let SRC = videoEl.src;
let times = [0];

function play() {
    videoEl.play();
}

function pause() {
    videoEl.pause()
    console.log(videoEl.currentTime);
}

function loadVideo() {
    state = 1;


}
let max = 8;
loadVideo();
let timmer;

function bishun() {
    state = 0;
    current = 1;
    videoEl.src = "video/爸.mp4"
    videoEl.pause();
    videoEl.currentTime = 0;
    videoEl.play();
    disableNext();
}

function fenbi() {
    videoEl.pause();
    state = 1;
    current = 0;
    videoEl.currentTime = 0;
    enableNext()

}

function next() {
    current++;
    replay();
}

function replay() {
    if (state == 0) {
        bishun();
    } else {
        if (timmer) {
            clearTimeout(timmer);
        }
        let oldVideoEl = document.getElementsByTagName('video')[0];
        if (oldVideoEl) oldVideoEl.remove();
        videoEl = document.createElement('video');
        // videoEl.src = SRC;
        // videoEl.pause();

        videoEl.src = "/video/爸_" + (current) + '.mp4';

        console.log(`第${current}笔`, );
        // videoEl.play();
        document.body.appendChild(videoEl);
        let autoplay = setInterval(() => {
            if (videoEl.paused) {
                videoEl.play();
                console.log('clear interval')
                clearInterval(autoplay);
            }
        }, 1000);
        videoEl.addEventListener('canplay', () => {
            if (videoEl.paused) videoEl.play();
            // setTimeout(() => {
            // videoEl.pause();
            // }, (videoEl.duration - 0.01) * 1000)
        });

        if (current >= 8) {
            disableNext();
        }
        if (videoEl.paused) videoEl.play();
        videoEl.click()
    }
    // document.body.webkitExitFullscreen ? document.body.webkitExitFullscreen() : '';
}

function disableNext() {
    $('#next').attr('disabled', 'disabled').attr('onclick', false);

}

function enableNext() {
    $('#next').attr('disabled', false);
    $('#next').attr('onclick', 'next()');

}