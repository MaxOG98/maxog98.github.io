/* import WaveSurfer from 'wavesurfer.js'; */
import { useWavesurfer } from "@wavesurfer/react";
import { PlayIcon, PauseIcon, VolumeIcon, VolumeXIcon } from "./icons";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Song = {
  name: string;
  duration: string;
  officialName: string;
  style: string;
};

const songs: Song[] = [
  {
    name: "Echo",
    duration: "3:24",
    officialName: "Echo",
    style: "Nostalgic/Hybrid Orchestral",
  },
  {
    name: "Creation",
    duration: "2:12",
    officialName: "Where it all Begins",
    style: "Drama/Orchestral",
  },
  {
    name: "Fantasy",
    duration: "1:09",
    officialName: "Butterflies",
    style: "Heartfelt/Orchestral",
  },
  {
    name: "Inspiration",
    duration: "1:12",
    officialName: "Shooting Star",
    style: "Inspirational/Orchestral",
  },
  {
    name: "Love",
    duration: "1:08",
    officialName: "River of Tears",
    style: "Emotional/Piano and Strings",
  },
  {
    name: "Sadness",
    duration: "1:02",
    officialName: "The Secret Garden",
    style: "Mystical/Orchestral",
  },
  {
    name: "Thoughts",
    duration: "2:00",
    officialName: "Pen on Paper",
    style: "Drama/Orchestral",
  },
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
    stroke: "rgb(250 250 254/ 0.6)",
    transition: { duration: 0.4, ease: "circOut" },
  },
  active: {
    strokeWidth: 2,
    pathLength: 1,
    stroke: "rgb(250 250 254/ 1)",
    transition: { duration: 0.4, ease: "circOut" },
  },
  hover: {
    strokeWidth: 1,
    pathLength: 0.8,
    stroke: "rgb(250 250 254/ 0.6)",
    transition: { duration: 1, ease: "circOut" },
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

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "100%",
  },
};

export default function MusicPlayer() {
  const waveContainerRef = useRef(null);
  const [currentSong, setCurrentSong] = useState<string>("");
  const [currentSongDuration, setCurrentSongDuration] = useState<string>("");
  const [currentTimeConverted, setCurrentTimeConverted] = useState<string>("");
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const secondsToString = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const { wavesurfer, isPlaying, isReady, currentTime } = useWavesurfer({
    container: waveContainerRef,
    waveColor: `rgba(${accent})`,
    progressColor: `rgba(${accentDark})`,
    cursorColor: `rgba(${accentLight})`,
    height: 60,
    dragToSeek: true,
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

  useEffect(() => {
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

  useEffect(() => {
    setCurrentTimeConverted(secondsToString(currentTime));
  }, [currentTime]);

  return (
    <div className="song-player relative flex flex-col justify-center">
      {!isReady && (
        <div className="absolute z-50 flex h-full w-full items-center justify-center bg-[#13151a] bg-opacity-50">
          <div className="flex flex-col items-center">
            <motion.div
              variants={loadingContainerVariants}
              className="flex h-10 w-16 justify-around"
              initial="start"
              animate="end"
            >
              <motion.span
                className="block h-4 w-4 rounded-full bg-white"
                variants={loadingCircleVariants}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              />
              <motion.span
                className="block h-4 w-4 rounded-full bg-white"
                variants={loadingCircleVariants}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              />
              <motion.span
                className="block h-4 w-4 rounded-full bg-white"
                variants={loadingCircleVariants}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <span>
              {currentSong &&
                `${
                  songs[songs.findIndex((song) => song.name === currentSong)]
                    .officialName
                } is `}
              loading
            </span>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center">
        <div className="flex w-full items-center justify-between">
          <button
            type="button"
            className={`rounded-full bg-accentdark p-2 hover:bg-accent ${isPlaying ? "text-orange-700" : ""}`}
            onClick={onPlayPause}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <div className="mx-2 w-full" ref={waveContainerRef}></div>
          <button
            type="button"
            className={`rounded-full bg-accentdark p-2 hover:bg-accent`}
            onClick={muteSong}
          >
            {isMuted ? <VolumeIcon /> : <VolumeXIcon />}
          </button>
        </div>
        <p className="my-8 text-xs tracking-tighter md:text-sm">
          {isReady ? (
            <>
              {currentSong !== "" ? (
                <span>
                  {songs[songs.findIndex((song) => song.name === currentSong)]
                    .officialName + " - "}
                  <span>
                    {currentTimeConverted}/{currentSongDuration}
                  </span>
                </span>
              ) : (
                <span>Chose a song to play</span>
              )}
            </>
          ) : (
            <span>. . .</span>
          )}
        </p>
      </div>

      <motion.div
        animate="visible"
        initial="hidden"
        variants={songsContainer}
        className="relative flex flex-col"
      >
        {songs.map((song) => (
          <motion.div key={song.name} variants={songsIn}>
            <motion.div
              className="mx-0 cursor-pointer py-1"
              initial="default"
              whileHover={
                isPlaying && currentSong === song.name ? "active" : "hover"
              }
              animate={
                currentSong === song.name && isPlaying ? "active" : "default"
              }
              onClick={() => onSongClick(song)}
            >
              <motion.div
                initial={{ opacity: 0.4, padding: 0 }}
                animate={
                  currentSong === song.name
                    ? {
                        opacity: 1,
                        padding: 0,
                        transition: { duration: 0.4, ease: "circOut" },
                      }
                    : isPlaying || !isReady
                      ? {
                          opacity: 0.4,
                          padding: "0 0.75rem",
                          transition: { duration: 0.4, ease: "circOut" },
                        }
                      : {
                          opacity: 1,
                          padding: 0,
                          transition: { duration: 0.4, ease: "circOut" },
                        }
                }
                className="mb-1 flex w-full cursor-pointer items-center justify-between text-xs font-medium opacity-45 md:text-base"
              >
                <p>
                  <span>{song.officialName}</span>
                  <span className="mx-2 text-xs font-light md:text-base md:tracking-normal">
                    ({song.style})
                  </span>
                </p>
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
