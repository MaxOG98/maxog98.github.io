/* import WaveSurfer from 'wavesurfer.js'; */
import { useWavesurfer } from "@wavesurfer/react";
import React from "react";
import { PlayIcon, PauseIcon, VolumeIcon, VolumeXIcon } from "./icons";
import { motion } from "framer-motion";

type Song = {
  name: string;
  duration: string;
};

const songs: Song[] = [
  { name: "Creation", duration: "2:12" },
  { name: "Fantasy", duration: "1:09" },
  { name: "Inspiration", duration: "1:12" },
  { name: "Love", duration: "1:08" },
  { name: "Sadness", duration: "1:02" },
  { name: "Thoughts", duration: "2:00" },
];

const accentLight = getComputedStyle(document.body).getPropertyValue(
  "--accent-light",
);
const accentDark = getComputedStyle(document.body).getPropertyValue(
  "--accent-dark",
);
const accent = getComputedStyle(document.body).getPropertyValue("--accent");

const strokeVariants = {
  default: {
    strokeWidth: 2,
    pathLength: 0,
    stroke: "rgb(248 250 252/ 1)",
    transition: { duration: 0.4, ease: "circOut" },
  },
  active: {
    strokeWidth: 2,
    pathLength: 1,
    stroke: "rgb(248 250 252/ 1)",
    transition: { duration: 0.4, ease: "circOut" },
  },
};

const songsContainer = {
  visible: {
    opacity: 1,

    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
  hidden: { opacity: 1 },
};

const songsIn = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.15, ease: "circOut" },
  },
  hidden: { opacity: 0, y: -25 },
};

export default function SongPlayer() {
  const waveContainerRef = React.useRef(null);
  const [currentSong, setCurrentSong] = React.useState<string>(songs[0].name);
  const [currentSongDuration, setCurrentSongDuration] = React.useState<string>(
    songs[0].duration,
  );
  const [currentTimeConverted, setCurrentTimeConverted] =
    React.useState<string>("");
  const [isMuted, setIsMuted] = React.useState<boolean>(false);

  const secondsToString = (time: number) => {
    const secondi = Math.floor(time);
    const minuti = Math.floor(secondi / 60);
    const resto = secondi % 60;
    const restoString = resto.toString();
    const paddedRestoString = restoString.padStart(2, "0");
    const newTime = `${minuti}:${paddedRestoString}`;
    return newTime;
  };

  const { wavesurfer, isPlaying, isReady, currentTime } = useWavesurfer({
    container: waveContainerRef,
    waveColor: `rgba(${accent})`,
    progressColor: `rgba(${accentDark})`,
    cursorColor: `rgba(${accentLight})`,
    height: 60,
    url: "/songs/" + songs[0].name + ".mp3",
  });

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  const muteSong = () => {
    wavesurfer && wavesurfer.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const onSongClick = (chosenSong: Song) => {
    if (wavesurfer) {
      if (currentSong === chosenSong.name) {
        onPlayPause();
        return;
      } else {
        wavesurfer.stop();
        wavesurfer.empty();

        setCurrentSong(chosenSong.name);
        setCurrentSongDuration(chosenSong.duration);

        wavesurfer.load("/songs/" + chosenSong.name + ".mp3").then(() => {
          wavesurfer.play();
        });
      }
    }
  };

  React.useEffect(() => {
    if (wavesurfer && isReady) {
      const handleFinish = () => {
        const currentIndex = songs.findIndex(
          (song) => song.name === currentSong,
        );
        const nextSong = songs[currentIndex + 1];

        if (nextSong) {
          setCurrentSong(nextSong.name);
          setCurrentSongDuration(nextSong.duration);
          wavesurfer.load("/songs/" + nextSong.name + ".mp3").then(() => {
            wavesurfer.play();
          });
        } else {
          setCurrentSong("");
        }
      };

      wavesurfer.on("finish", handleFinish);

      return () => {
        wavesurfer.un("finish", handleFinish);
      };
    }
  }, [wavesurfer, isReady, currentSong]);

  React.useEffect(() => {
    setCurrentTimeConverted(secondsToString(currentTime));
  }, [currentTime]);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col items-center">
        <div className="flex w-full items-center justify-between space-x-4">
          <button
            type="button"
            className={`rounded-full bg-accentdark p-2 hover:bg-accent ${isPlaying ? "text-orange-700" : ""}`}
            onClick={onPlayPause}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <div className="w-full" ref={waveContainerRef}></div>
          <button
            type="button"
            className={`rounded-full bg-accentdark p-2 hover:bg-accent`}
            onClick={muteSong}
          >
            {isMuted ? <VolumeIcon /> : <VolumeXIcon />}
          </button>
        </div>
        <p className="my-8 text-sm">
          {currentSong !== "" && (
            <span>
              {"You are now listening to: " + currentSong + " - "}
              <span>
                {currentTimeConverted}/{currentSongDuration}
              </span>
            </span>
          )}
          {currentSong === "" && <span>Chose a song to play</span>}
        </p>
      </div>

      <motion.div
        animate="visible"
        initial="hidden"
        variants={songsContainer}
        className="flex flex-col"
      >
        {songs.map((song) => (
          <motion.div key={song.name} variants={songsIn}>
            <motion.div
              className="mx-0 h-14 cursor-pointer pt-4"
              initial="default"
              animate={
                currentSong === song.name && isPlaying ? "active" : "default"
              }
              onClick={() => onSongClick(song)}
            >
              <motion.div
                initial={{ opacity: 0.4, padding: "0 0.75rem" }}
                animate={
                  currentSong === song.name && isPlaying
                    ? {
                        opacity: 1,
                        padding: 0,
                        transition: { duration: 0.4, ease: "circOut" },
                      }
                    : {
                        opacity: 0.4,
                        padding: "0 0.75rem",
                        transition: { duration: 0.4, ease: "circOut" },
                      }
                }
                className="mb-2 flex w-full cursor-pointer items-center justify-between opacity-45"
              >
                <p>{song.name}</p>
                <span>{song.duration}</span>
              </motion.div>
              <motion.svg
                alignmentBaseline="baseline"
                viewBox="0 0 700 3"
                fill="none"
                stroke="gray"
                strokeWidth="3"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  variants={strokeVariants}
                  strokeWidth="2"
                  d="M 350, 0 H 0"
                />
                <motion.path
                  variants={strokeVariants}
                  strokeWidth="2"
                  d="M 350, 0 H 700"
                />
              </motion.svg>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
