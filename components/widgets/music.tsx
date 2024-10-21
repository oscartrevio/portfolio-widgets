"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa6";

import { TextMorph } from "../ui/text-morph";

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
      <div className="relative flex h-24 items-center justify-between overflow-hidden rounded-3xl p-4 text-white-a12 will-change-auto">
        <div
          className="-z-10 absolute inset-0 overflow-hidden saturate-200"
          style={{
            background: `url("${currentTrack.albumImageUrl ?? undefined}") lightgray 50% / cover no-repeat`,
          }}
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            background: "rgba(0, 0, 0, 0.50)",
            backdropFilter: "blur(8px)",
          }}
        />
        <div className="z-10 flex items-center gap-2">
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
                  onLoad={() => setCoverLoaded(true)}
                  className="size-16 rounded-lg"
                  style={{
                    boxShadow: "0px 2px 12px 2.5px rgba(0, 0, 0, 0.32)",
                  }}
                />
              </Link>
            </motion.div>
          </AnimatePresence>
          <div className="flex w-full flex-col gap-1 text-nowrap tracking-tight">
            <h1 className="bg-gradient-to-r overlay:bg-[rgba(255,255,255,1)] from-[rgba(255,255,255,0.35)] to-[rgba(255,255,255,0.35)] bg-clip-text font-semibold text-transparent text-xs uppercase bg-blend-normal">
              Now Playing
            </h1>
            <span className="text-nowrap leading-tight">
              <span className="flex items-baseline gap-1.5">
                <TextMorph className="text-nowrap bg-gradient-to-r overlay:bg-[rgba(255,255,255,1)] from-[rgba(255,255,255,0.8)] to-[rgba(255,255,255,0.8)] bg-clip-text font-semibold text-transparent bg-blend-normal">
                  {currentTrack.title}
                </TextMorph>
                {currentTrack.explicit && (
                  <span className="text-sm text-white-a12 opacity-50 mix-blend-overlay">
                    <svg
                      viewBox="0 0 72 72"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 fill-current opacity-50 mix-blend-overlay"
                    >
                      <title>Explicit</title>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M58.6914 71.1914H12.4512C4.15038 71.1914 0 67.0899 0 58.8867V12.3047C0 4.10159 4.15038 0 12.4512 0H58.6914C67.041 0 71.1426 4.10159 71.1426 12.3047V58.8867C71.1426 67.0899 67.041 71.1914 58.6914 71.1914ZM22.998 49.2187C22.998 51.6601 24.2187 53.3202 26.5624 53.3202H45.2148C46.9238 53.3202 48.1933 52.1972 48.1933 50.3905C48.1933 48.5351 46.9238 47.4609 45.2148 47.4609H30.2245V37.6464H44.1405C45.8495 37.6464 47.1191 36.7187 47.1191 34.912C47.1191 33.0566 45.8495 32.08 44.1405 32.08H30.2245V22.7538H45.2148C46.9238 22.7538 48.1933 21.5819 48.1933 19.8241C48.1933 17.9198 46.9238 16.8945 45.2148 16.8945H26.5624C24.2187 16.8945 22.998 18.5546 22.998 20.996V49.2187Z"
                      />
                    </svg>
                  </span>
                )}
              </span>
              <TextMorph className="text-nowrap bg-gradient-to-r overlay:bg-[rgba(255,255,255,1)] from-[rgba(255,255,255,0.5)] to-[rgba(255,255,255,0.5)] bg-clip-text font-normal text-sm text-transparent bg-blend-normal">
                {currentTrack.artist}
              </TextMorph>
            </span>
          </div>
        </div>
        {/* MUSIC CONTROLS */}
        <div className="relative z-30 flex h-full items-center gap-3">
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
    </>
  );
}
