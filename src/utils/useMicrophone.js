import { useEffect, useState } from "react";
import { lerp, constrain } from "Utils/number";
import { AudioContext } from "Utils/AudioContext";

export const useMicrophone = (fftSize, targetChannel = 2, smooth = 0.8) => {
  const [effectFrequencyArray, updateEffectFrequencyArray] = useState(0);
  useEffect(() => {
    navigator.getUserMedia(
      { audio: true },
      stream => {
        window.persistAudioStream = stream;

        const audioContent = new AudioContext();
        const audioStream = audioContent.createMediaStreamSource(stream);
        const analyser = audioContent.createAnalyser();
        // analyser.smoothingTimeConstant = 0.6;
        audioStream.connect(analyser);
        analyser.fftSize = constrain(fftSize, 32, 1024);

        const frequencyArray = new Uint8Array(analyser.frequencyBinCount);

        const update = () => {
          requestAnimationFrame(update);
          analyser.getByteFrequencyData(frequencyArray);
          updateEffectFrequencyArray(
            lerp(effectFrequencyArray, frequencyArray[targetChannel], smooth) /
              125
          );
        };
        update();
      },
      error => {
        console.error(error);
      }
    );
  }, []);

  return [effectFrequencyArray];
};
