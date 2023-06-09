const playBtn = document.querySelector('.btn-play');
const pauseBtn = document.querySelector('.btn-pause');
const prevBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');

const title = document.querySelector('.song-title');
const artist = document.querySelector('.song-artist');
const cover = document.querySelector('.audio-img');
const body = document.querySelector('body');
const audio = new Audio();
let playNum = 0;

const tracks = [
    {
        'src': './assets/audio/after-dark.mp3',
        'title': 'After Dark',
        'artist': 'Mr. Kitty',
        'cover': './assets/img/after-dark.jpg',
        'background': './assets/img/after-dark-bg.jpg',
    },
    {
        'src': './assets/audio/one-for-the-road.mp3',
        'title': 'One For The Road',
        'artist': 'Arctic Monkeys',
        'cover': './assets/img/one-for-the-road.jpg',
        'background': './assets/img/one-for-the-road-bg.jpg',
    },
    {
        'src': './assets/audio/were-not-just-friends.mp3',
        'title': 'We \'re Not Just Friends',
        'artist': 'Parks, Squares and Alleys',
        'cover': './assets/img/were-not-just-friends.jpg',
        'background': './assets/img/were-not-just-friends-bg.jpg',
    },
    {
        'src': './assets/audio/when-i-grow-up.mp3',
        'title': 'When I Grow Up',
        'artist': 'Fever Ray',
        'cover': './assets/img/when-i-grow-up.JPG',
        'background': './assets/img/when-i-grow-up-bg.jpg',}
];

function playAudio() {
  const track = tracks[playNum];
  audio.src = track.src;
  audio.currentTime = 0;
  audio.play();
  title.textContent = track.title;
  artist.textContent = track.artist;
  cover.style.backgroundImage = `url("${track.cover}")`;
  body.style.backgroundImage = `url("${track.background}")`;
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

const durationTime = document.querySelector('.duration-time');
const currentTime = document.querySelector('.current-time');
const progress = document.querySelector('.progress');

const calculateTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}

const displayDuration = () => {
    durationTime.textContent = calculateTime(audio.duration);
}

const progressMax = () => {
    progress.max = Math.floor(audio.duration);
}

  if (audio.readyState > 0) {
    displayDuration();
    progressMax();
    currentTime.textContent = '0:00';
  } else {
    audio.addEventListener('loadeddata', () => {
      displayDuration();
      progressMax();
      currentTime.textContent = '0:00';
    });
}

progress.addEventListener('input', () => {
    currentTime.textContent = calculateTime(progress.value);
  });

progress.addEventListener('change', () => {
    audio.currentTime = progress.value;
  });

audio.addEventListener('timeupdate', () => {
    progress.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progress.value);
  });

