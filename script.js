const videos = {
  "3": "as\u0327k3.mp4",
  "5": "askk5.mp4",
  "7": "askk7.mp4",
  "1": "askkk11.mp4",
};

const soundtracks = {
  "3": "m-prep6.wav",
  "5": "777,,,,,,,(^^).wav",
  "7": "tuesday.wav",
  "1": "waterboardingthefish.wav",
};

const videoElement = document.querySelector("#gallery-video");
const audioElement = document.querySelector("#gallery-audio");

if (videoElement && audioElement) {
  const videoId = new URLSearchParams(window.location.search).get("video");
  const videoFile = videos[videoId];
  const soundtrackFile = soundtracks[videoId];
  const error = document.querySelector("#video-error");

  if (videoFile) {
    videoElement.src = videoFile;
    videoElement.addEventListener("error", () => {
      error.textContent = `Could not load ${videoFile}.`;
      error.hidden = false;
    });

    audioElement.src = soundtrackFile;
    audioElement.addEventListener("error", () => {
      error.textContent = `Could not load ${soundtrackFile}.`;
      error.hidden = false;
    });

    const playSoundtrack = () => {
      audioElement.play().then(() => {
        error.hidden = true;
      }).catch((playError) => {
        if (playError.name === "NotAllowedError") {
          error.textContent = "Tap anywhere to start the soundtrack.";
          error.hidden = false;
          document.addEventListener("click", playSoundtrack, { once: true });
        } else {
          error.textContent = `Could not play ${soundtrackFile}.`;
          error.hidden = false;
        }
      });
    };

    playSoundtrack();
  } else {
    error.textContent = "No valid video was selected.";
    error.hidden = false;
  }
}