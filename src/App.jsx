import { useEffect, useRef, useState } from "react";
import audio from "./sample.mp3";

function App() {
  const audioRef = useRef();
  const [playing, setPlay] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(audioRef.current.currentTime);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  const jump = (val) => {
    audioRef.current.currentTime += val;
    setTime(audioRef.current.currentTime);
  };

  return (
    <div>
      {time}
      <audio src={audio} controls ref={audioRef}></audio>
      <button
        onClick={() => {
          jump(-15);
        }}
      >
        戻る
      </button>
      {playing ? (
        <button
          onClick={() => {
            setPlay(false);
          }}
        >
          stop
        </button>
      ) : (
        <button
          onClick={() => {
            setPlay(true);
          }}
        >
          play
        </button>
      )}
      <button
        onClick={() => {
          jump(30);
        }}
      >
        進む
      </button>
    </div>
  );
}

export default App;
