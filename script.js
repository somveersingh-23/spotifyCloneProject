console.log("Welcome to Spotify");

// Initialize the variables
let SongIndex = 0;
let audioElement = new Audio('music/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItems'));

let songs = [
    { songName: "Aaj ki raat maja", filePath: "music/1.mp3", coverPath: "img/aaj_ki_rat.jpeg" },
    { songName: "Husan Teran tauba tauba", filePath: "music/2.mp3", coverPath: "img/tauba.jpeg" },
    { songName: "pasoori By coke Studio", filePath: "music/3.mp3", coverPath: "img/pasoori.jpeg" },
    { songName: "Chuttamulle Devara song", filePath: "music/4.mp3", coverPath: "img/chuttmalle.jpg" },
    { songName: "Meri jaan Meri jaan Gangubai", filePath: "music/5.mp3", coverPath: "img/meri_jan.jpg" },
    { songName: "Akshath-Nadaaniyan Song", filePath: "music/6.mp3", coverPath: "img/images (2).jpeg" }
];

songItems.forEach((element, i) => {
    // Ensure the image and song name elements are properly accessed
    let imgElement = element.getElementsByTagName("img")[0];
    let songNameElement = element.getElementsByClassName("songName")[0];
    
    // Fixing issue by assigning a class "songName" to all song elements
    if (imgElement) {
        imgElement.src = songs[i].coverPath;
    }
    if (songNameElement) {
        songNameElement.innerText = songs[i].songName;
    } else {
        console.error("Could not find song name element for song item:", i);
    }
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to events
audioElement.addEventListener('timeupdate', () => {
    // Update seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        SongIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `music/${SongIndex + 1}.mp3`;
        masterSongName.innerText = songs[SongIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (SongIndex >= 5) {
        SongIndex = 0;
    } else {
        SongIndex += 1;
    }
    audioElement.src = `music/${SongIndex + 1}.mp3`;
    masterSongName.innerText = songs[SongIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
    if (SongIndex <= 0) {
        SongIndex = 0;
    } else {
        SongIndex -= 1;
    }
    audioElement.src = `music/${SongIndex + 1}.mp3`;
    masterSongName.innerText = songs[SongIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
