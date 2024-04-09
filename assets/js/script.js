const playpauseDiv = document.querySelector(".playpause");
const video = document.querySelector("video");
const volumeChangerRange = document.querySelector(".volume-range");
const volemuChangeProgress = document.querySelector(".volume-range-progress");
const playPauseBtn = document.querySelector(".play-pause-btn");
const playPauseBtnIcon = playPauseBtn.querySelector("i");
const stopBtn = document.querySelector(".stop-btn");
const muteUnmuteBtn = document.querySelector(".mute-unmute-btn");
const fullscreenBtn = document.querySelector(".fullscreen");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-bar");
const progressTime = document.querySelector(".time");
const progressTimeRemaining = document.querySelector(".time-remaining");
const videoTitle = document.querySelector(".title");
const dotTime = document.querySelector(".dot-time");
const player = document.querySelector("#player");

// Change title
if (window.location.search.split("&")[0].split("=")[0] == "?name") {
    videoTitle.textContent = window.location.search.split("&")[0].split("=")[1];

    document.querySelector("title").textContent = window.location.search
        .split("&")[0]
        .split("=")[1];
} else {
    videoTitle.textContent = "Video Player";
}
// functions
// playpause
const playPause = (video, element, keyname) => {
    if (typeof element != "object") {
        if (video != null && element != null) {
            element.addEventListener("click", () => {
                if (video.paused) {
                    video.play();
                    playPauseBtnIcon.classList.remove("fa-play");
                    playPauseBtnIcon.classList.add("fa-pause");
                } else if (!video.paused) {
                    video.pause();
                    playPauseBtnIcon.classList.remove("fa-pause");
                    playPauseBtnIcon.classList.add("fa-play");
                } else {
                    console.log("Nimadir xato ketdi");
                }
            });
        } else if (video == null) {
            console.log("Video elementini ko'rsatishda xatolik.");
        } else if (element == null) {
            console.log("elementni ko'rsatishda xatolik");
        } else {
            console.log("Nimadir xato ketdi!");
        }
    } else if (typeof element == "object") {
        element.forEach((el) => {
            if (video != null && el != null) {
                el.addEventListener("click", () => {
                    if (video.paused) {
                        video.play();
                        playPauseBtnIcon.classList.remove("fa-play");
                        playPauseBtnIcon.classList.add("fa-pause");
                    } else if (!video.paused) {
                        video.pause();
                        playPauseBtnIcon.classList.remove("fa-pause");
                        playPauseBtnIcon.classList.add("fa-play");
                    } else {
                        console.log("Nimadir xato ketdi");
                    }
                });
            } else if (video == null) {
                console.log("Video elementini ko'rsatishda xatolik.");
            } else if (el == null) {
                console.log("elementni ko'rsatishda xatolik");
            } else {
                console.log("Nimadir xato ketdi!");
            }
        });
    }

    if (keyname != undefined && keyname != null) {
        if (typeof keyname == "object") {
            keyname.forEach((name) => {
                window.addEventListener("keydown", (e) => {
                    if (e.key == name) {
                        if (video.paused) {
                            video.play();
                            playPauseBtnIcon.classList.remove("fa-play");
                            playPauseBtnIcon.classList.add("fa-pause");
                        } else if (!video.paused) {
                            video.pause();
                            playPauseBtnIcon.classList.remove("fa-pause");
                            playPauseBtnIcon.classList.add("fa-play");
                        } else {
                            console.log("Nimadir xato ketdi");
                        }
                    }
                });
            });
        } else if (typeof keyname != "object") {
            window.addEventListener("keydown", (e) => {
                if (e.key == " ") {
                    if (video.paused) {
                        video.play();
                        playPauseBtnIcon.classList.remove("fa-play");
                        playPauseBtnIcon.classList.add("fa-pause");
                    } else if (!video.paused) {
                        video.pause();
                        playPauseBtnIcon.classList.remove("fa-pause");
                        playPauseBtnIcon.classList.add("fa-play");
                    } else {
                        console.log("Nimadir xato ketdi");
                    }
                }
            });
        } else {
            console.log("Nimadir xato ketdi.");
        }
    }
};

const volumeChanger = (video, element) => {
    if (video != null && element != null) {
        element.addEventListener("input", () => {
            volemuChangeProgress.style.width = `${element.value * 100}px`;
            localStorage.setItem("volume", element.value);
            video.volume = element.value;
            console.log(`Video Volume is: ${element.value * 100}`);
            if (video.volume == 0) {
                video.muted;
                muteUnmuteBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
            } else {
                muteUnmuteBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
            }
        });
    } else if (video == null) {
        console.log("Video elementini ko'rsatishda xatolik.");
    } else if (element == null) {
        console.log("elementni ko'rsatishda xatolik");
    } else {
        console.log("Nimadir xato ketdi!");
    }

    window.addEventListener("keydown", (e) => {
        if (e.key == "ArrowUp") {
            if (video.volume < 1) {
                video.volume += 0.1;
                element.value = video.volume;
                volemuChangeProgress.style.width = `${element.value * 100}px`;
            }
        } else if (e.key == "ArrowDown") {
            if (video.volume > 0) {
                video.volume -= 0.1;
                element.value = video.volume;
                volemuChangeProgress.style.width = `${element.value * 100}px`;
            }
        }
    });
};

const updateProgress = (video, element) => {
    const progressPercent = (video.currentTime / video.duration) * 100;
    element.style.width = `${progressPercent}%`;
    progressTime.textContent = `${Math.floor(
        video.currentTime / 60,
    )}:${Math.floor(video.currentTime % 60)}`;
    progressTimeRemaining.textContent = `${Math.floor(
        video.duration / 60,
    )}:${Math.floor(video.duration % 60)}`;

    const dotTimeFnc = () => {
        dotTime.style.opacity = 1;
        setInterval(() => {
            dotTime.textContent = `${Math.floor(
                video.currentTime / 60,
            )}:${Math.floor(video.currentTime % 60)}`;
        }, 1);
    };

    progress.addEventListener("mouseenter", dotTimeFnc);
    progress.addEventListener("mouseleave", () => {
        dotTime.style.opacity = 0;
    });
};
console.log(dotTime);

const changeProgress = (video, element) => {
    element.addEventListener("click", (e) => {
        const progressPercent = (e.offsetX / element.offsetWidth) * 100;
        video.currentTime = (progressPercent * video.duration) / 100;
    });
    element.addEventListener("mousedown", mousedown);

    function mousedown() {
        element.addEventListener("mousemove", mouseMove);
        element.addEventListener("mouseup", mouseup);

        function mouseMove(e) {
            const progressPercent = (e.offsetX / element.offsetWidth) * 100;
            video.currentTime = (progressPercent * video.duration) / 100;

            // element.style.left = e.pageX - 50 + "px";
            // element.style.top = e.pageY - 50 + "px";
        }

        function mouseup() {
            element.removeEventListener("mousemove", mouseMove);
            element.removeEventListener("mouseup", mouseup);
        }
    }
};

stopBtn.addEventListener("click", () => {
    video.currentTime = 0;
    video.pause();
    playPauseBtnIcon.classList.remove("fa-pause");
    playPauseBtnIcon.classList.add("fa-play");
});

muteUnmuteBtn.addEventListener("click", () => {
    if (video.muted) {
        video.muted = false;
        muteUnmuteBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
        const volume = localStorage.getItem("volume");
        console.log(volume);
        if (volume < 0.1) {
            volumeChangerRange.value = 1;
            video.volume = 1;
        } else {
            volumeChangerRange.value = +volume;
            video.volume = +volume;
        }
    } else if (!video.muted) {
        volumeChangerRange.value = 0;
        video.muted = true;
        muteUnmuteBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
    } else {
        console.log("Nimadir xato ketdi");
    }
});

fullscreenBtn.addEventListener("click", () => {
    var isInFullScreen =
        (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement &&
            document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement &&
            document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);
    if (!isInFullScreen) {
        if (player.requestFullscreen) {
            player.requestFullscreen();
            fullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
        } else if (player.webkitRequestFullscreen) {
            player.webkitRequestFullscreen();
            fullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
        } else if (player.mozRequestFullscreen) {
            player.mozRequestFullscreen();
            fullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
        } else if (player.msRequestFullscreen) {
            player.msRequestFullscreen();
            fullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
        } else {
            console.log("Nimadir xato ketdi");
        }
    } else {
        if (document.exitFullscreen) {
            fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
            fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
            document.msExitFullscreen();
        }
    }
});

playPause(video, [playpauseDiv, playPauseBtn], [" ", "p", "P", "Enter"]);
volumeChanger(video, volumeChangerRange);
video.addEventListener("timeupdate", () => {
    updateProgress(video, progressBar);
});
changeProgress(video, progress);
