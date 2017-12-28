// videojs('my-player', {
//     children: {
//         controlBar: {
//             fullscreenToggle: false
//         }
//     }
// });
/*以下是渲染CANVAS画布中的视频*/
//获取video
// <video style="display:none;width:100px;height:200px" src="test.mp4" id="video" x5-video-player-type='h5' x5-video-player-fullscreen='true' x5-playsinline="" playsinline="" webkit-playsinline="" poster="" preload="auto" autoplay="autoplay"></video>


//获取canvas画布
// var TestCanvas = document.getElementsByTagName("canvas")[0];
//设置画布
// var TestCanvas2D = TestCanvas.getContext('2d');
//设置setinterval定时器
// var TestVideoTimer = null;
//监听播放

// setTimeout(() => {
//     let myVideo = document.getElementsByTagName('video')[0];
//     myVideo.addEventListener('play', (e) => {
//         // alert('zhun')
//         document.exitFullscreen ? document.exitFullscreen() :
//             document.mozCancelFullScreen ? document.mozCancelFullScreen() :
//             document.webkitExitFullscreen ? document.webkitExitFullscreen() : '';
//     })
// }, 1000)


let videoEl = document.getElementsByTagName('video')[0];
const SRC = videoEl.src;

/** state 0 笔顺 1分笔 */
let state = 1;
let current = 0;

let times = [0];

function play() {
    videoEl.play();
}

function pause() {
    // videoEl.pause() console.log(videoEl.currentTime);
}

function loadVideo() {
    $.ajax('/video.json', {
        method: 'get',
        success: (rtn) => {
            if (rtn.ok) {
                times = rtn.data;
                state = 1;
                current = 0; // next() } else { alert('未知的文字')
            }
        }
    });
    console.log(videoEl.src);
}
loadVideo();
let timmer;

function bishun() {
    state = 0;
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
    videoEl.src = "/";
    ++current;
    replay();
}
videoEl.onpause = function() { console.log(videoEl.currentTime); }
let interval;

function replay() {
    if (!videoEl) alert('no video');
    // draw()
    if (interval) clearInterval(interval);
    if (state == 0) {
        bishun();
    } else {
        if (timmer) {
            clearTimeout(timmer);
        }

        let startTime = times[current - 2] ? times[current - 2] : 0;
        let timeout = times[current - 1] - startTime;
        let endtime = times[current - 1];
        if (current > times.length - 1) {
            disableNext();
        }
        // document.body.appendChild(videoEl);
        let oldVideoEl = document.getElementsByTagName('video')[0];
        if (oldVideoEl) oldVideoEl.remove();
        let newVideoEl = document.createElement('video');
        newVideoEl.src = SRC;
        newVideoEl.currentTime = startTime / 1000;
        // videoEl.currentTime = startTime / 1000;
        // videoEl.src = SRC;
        console.log(`第${current}笔`, '播放起点:', startTime, '播放时间:', timeout, videoEl.currentTime, 'endtime:', endtime);
        console.log('pause', videoEl.currentTime * 1000, endtime);
        let videoParent = document.getElementById('video');
        videoParent.appendChild(newVideoEl);
        newVideoEl.addEventListener('canplay', () => {

            // newVideoEl.currentTime = startTime;
            newVideoEl.play();
            interval = setInterval(() => {
                let now = newVideoEl.currentTime;
                if (now * 1000 > endtime) {
                    newVideoEl.pause();
                    newVideoEl.src = "/";
                    newVideoEl.remove();
                    document.body.webkitExitFullscreen ? document.body.webkitExitFullscreen() : '';
                    // document.body.requestFullscreen();
                    clearInterval(interval);
                }
            }, 10);
        });
        newVideoEl.play();


    }
}

function disableNext() {
    $('#next').attr('disabled', 'disabled').attr('onclick', false);
}

function enableNext() {
    $('#next').attr('disabled', false);
    $('#next').attr('onclick', 'next()');
}