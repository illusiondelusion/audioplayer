const playBtn = document.querySelector('.btn-play');
const pauseBtn = document.querySelector('.btn-pause');
const prevBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');
const audio = new Audio();
let playNum = 0;

const tracks = ['./assets/audio/after-dark.mp3', './assets/audio/one-for-the-road.mp3', './assets/audio/were-not-just-friends.mp3', './assets/audio/when-i-grow-up.mp3'];

function playAudio() { 
  audio.src = tracks[playNum];
  audio.currentTime = 0;
  audio.play();
  playBtn.classList.add('hidden');
  pauseBtn.classList.remove('hidden');
}

function pauseAudio() {
  audio.pause();
  playBtn.classList.remove('hidden');
  pauseBtn.classList.add('hidden');
}

playBtn.addEventListener('click', playAudio);
pauseBtn.addEventListener('click', pauseAudio);

function playNext() {
    playNum ++;
    if (playNum > tracks.length - 1) {
        playNum = 0;
    }

    playAudio();
}

function playPrev() {
    playNum --;
    if (playNum < 0) {
        playNum = tracks.length - 1;
    }

    playAudio();
}

prevBtn.addEventListener('click', playPrev);
nextBtn.addEventListener('click', playNext);