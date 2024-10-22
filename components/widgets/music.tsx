"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa6";

interface Track {
  albumImageUrl: string;
  href: string;
  title: string;
  artist: string;
  explicit: boolean;
}

const songs: Track[] = [
  {
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273f78c98bbf2b3c9e2a764203e",
    href: "https://open.spotify.com/track/0wXuerDYiBnERgIpbb3JBR",
    title: "Redbone",
    artist: "Childish Gambino",
    explicit: true,
  },
  {
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2739852437d39690c760e108a14",
    href: "https://open.spotify.com/track/3a3dQOO19moXPeTt2PomoT",
    title: "What You Heard",
    artist: "Sonder",
    explicit: true,
  },
  {
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273175c577a61aa13d4fb4b6534",
    href: "https://open.spotify.com/track/16umSNZfofRpDqTvf8DIAo",
    title: "Wings",
    artist: "Mac Miller",
    explicit: true,
  },
  {
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d18fa8f63707115cb1b38f65",
    href: "https://open.spotify.com/track/4LpUpiYoZ2M3Z1kmhn4EQo",
    title: "Still Beating",
    artist: "Mac DeMarco",
    explicit: false,
  },
  {
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2739164bafe9aaa168d93f4816a",
    href: "https://open.spotify.com/track/7D0RhFcb3CrfPuTJ0obrod",
    title: "Sparks",
    artist: "Coldplay",
    explicit: false,
  },
];

export default function Music() {
  const [tracks] = useState<Track[]>(songs);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(
    null,
  );
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [coverLoaded, setCoverLoaded] = useState(false);

  useEffect(() => {
    setCurrentTrackIndex(Math.floor(Math.random() * songs.length));
  }, []);

  useEffect(() => {
    if (currentTrackIndex !== null) {
      setProgress(0);
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!paused && currentTrackIndex !== null) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            // If progress reaches 100, go to next track
            handleNextTrack();
            return 0; // Reset progress to 0
          }
          return prev + 0.1; // Increment progress
        });
      }, 100); // Increment every 100ms
    }

    return () => {
      if (interval) clearInterval(interval); // Cleanup interval on unmount
    };
  }, [paused, currentTrackIndex]);

  if (tracks === null || currentTrackIndex === null) {
    return null;
  }

  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => ((prevIndex ?? 0) + 1) % tracks.length);
  };

  const handlePreviousTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === null
        ? tracks.length - 1
        : prevIndex === 0
          ? tracks.length - 1
          : prevIndex - 1,
    );
  };

  const handlePausePlay = () => {
    setPaused((prevPaused) => !prevPaused);
  };

  const currentTrack = tracks[currentTrackIndex];

  return (
    <>
      <div className="flex h-24 flex-grow-0 items-center justify-between overflow-hidden rounded-3xl p-4 text-white-a12 will-change-auto">
        {/* BACKGROUND IMAGE */}
        <div
          className="-z-10 absolute inset-0 overflow-hidden rounded-3xl saturate-200"
          style={{
            background: `url("${currentTrack.albumImageUrl ?? undefined}") lightgray 50% / cover no-repeat`,
          }}
        />
        <div
          className="absolute inset-0 overflow-hidden rounded-3xl"
          style={{
            background: "rgba(0, 0, 0, 0.50)",
            backdropFilter: "blur(8px)",
          }}
        />

        <div className="flex w-full items-center justify-between">
          {/* SONG INFO */}
          <div className="z-10 flex w-full items-center gap-2 truncate">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentTrackIndex}
                initial={{ scale: 1, opacity: 0, filter: "blur(4px)" }}
                animate={{
                  scale: paused ? 0.9 : 1,
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                exit={{ scale: 1, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="aspect-square size-16"
              >
                <Link
                  href={currentTrack.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={currentTrack.albumImageUrl}
                    alt={"Album cover"}
                    width={100}
                    height={100}
                    loading="eager"
                    onLoad={() => setCoverLoaded(true)}
                    className="size-16 rounded-lg"
                    style={{
                      boxShadow: "0px 2px 12px 2.5px rgba(0, 0, 0, 0.32)",
                    }}
                  />
                </Link>
              </motion.div>
            </AnimatePresence>
            <div className="flex flex-col gap-1 truncate text-nowrap tracking-tight">
              <h1 className="truncate bg-gradient-to-r overlay:bg-[rgba(255,255,255,1)] from-[rgba(255,255,255,0.35)] to-[rgba(255,255,255,0.35)] bg-clip-text font-semibold text-transparent text-xs uppercase bg-blend-normal">
                Now Playing
              </h1>
              <span className="leading-tight">
                <h2 className="truncate bg-gradient-to-r from-[rgba(255,255,255,0.8)] to-[rgba(255,255,255,0.8)] bg-clip-text font-semibold text-transparent">
                  {currentTrack.title}
                </h2>
                <h2 className="truncate bg-gradient-to-r from-[rgba(255,255,255,0.5)] to-[rgba(255,255,255,0.5)] bg-clip-text font-normal text-sm text-transparent">
                  {currentTrack.artist}
                </h2>
              </span>
            </div>
          </div>

          {/* MUSIC CONTROLS */}
          <div className="z-30 flex h-full flex-shrink-0 items-center justify-end gap-3">
            <motion.button
              type="button"
              onClick={handlePreviousTrack}
              className="relative flex size-9 items-center justify-center overflow-hidden rounded-full text-center"
              whileTap={{ scale: 0.9 }}
            >
              <div className="z-10 mr-0.5">
                <FaBackward />
              </div>
              <div className="absolute inset-0 z-0 h-full w-full bg-[#C2C2C2] opacity-45 mix-blend-overlay" />
            </motion.button>
            <motion.button
              type="button"
              onClick={handlePausePlay}
              className="relative flex size-12 items-center justify-center overflow-hidden rounded-full text-center"
              whileTap={{ scale: 0.9 }}
            >
              <div className="z-10 text-2xl">
                {paused ? <FaPlay className="ml-1" /> : <FaPause />}
              </div>
              <div className="absolute z-0 h-full w-full bg-[#C2C2C2] opacity-45 mix-blend-overlay" />
              <svg
                className="-rotate-90 absolute top-0 left-0 h-full w-full"
                viewBox="0 0 100 100"
              >
                <title>Track</title>
                <circle
                  cx="50"
                  cy="50"
                  r="47"
                  fill="transparent"
                  strokeWidth="6"
                  className="stroke-[#C2C2C2] opacity-45 mix-blend-overlay"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="47" // Adjust radius to match the background circle
                  fill="transparent"
                  stroke="#fff"
                  strokeWidth="6"
                  strokeDasharray="295.31"
                  strokeDashoffset={295.31 * (1 - progress / 100)} // Use progress state
                  strokeLinecap="round"
                />
              </svg>
            </motion.button>
            <motion.button
              type="button"
              onClick={handleNextTrack}
              className="relative flex size-9 items-center justify-center overflow-hidden rounded-full text-center"
              whileTap={{ scale: 0.9 }}
            >
              <div className="z-10 ml-0.5">
                <FaForward />
              </div>
              <div className="absolute z-0 h-full w-full bg-[#C2C2C2] opacity-45 mix-blend-overlay" />
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}
