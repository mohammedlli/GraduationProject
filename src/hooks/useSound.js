import soundErr from "../../public/lesiakower-error-mistake-sound-effect-incorrect-answer-437420.mp3";
import soundSuccess from "../../public/freesounds123-applause-sound-427084.mp3";

export const playSound = (type) => {
  if (type === "err") {
    const audio = new Audio(soundErr);
    audio.volume = 0.5;
    audio.play();
  } else {
    const audio = new Audio(soundSuccess);
    audio.volume = 0.5;
    audio.play();
  }
};
