"use client";

import { cn } from "@/lib/cn";

import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa6";

import { BackgroundImage, TrackInfo } from "./album";
import { songs } from "./songs";

export default function MusicPlayer() {
  // Initialize track index and progress to ensure they are stable on server render
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const tracks = useMemo(() => songs, []);

  useEffect(() => {
    // Set a random track on the initial render only
    setCurrentTrackIndex(Math.floor(Math.random() * tracks.length));
  }, [tracks.length]);

  useEffect(() => {
    setProgress(0);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!paused) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNextTrack();
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [paused]);

  const handleNextTrack = useCallback(() => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  }, [tracks.length]);

  const handlePreviousTrack = useCallback(() => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1,
    );
  }, [tracks.length]);

  const handlePausePlay = useCallback(() => {
    setPaused((prevPaused) => !prevPaused);
  }, []);

  const currentTrack = tracks[currentTrackIndex];

  return (
    <div className="relative flex h-24 flex-grow-0 items-center justify-between overflow-hidden rounded-3xl p-4 text-white-a12 will-change-auto">
      <BackgroundImage currentTrack={currentTrack} />
      <div className="z-30 flex w-full items-center justify-between">
        {/* SONG INFO */}
        <TrackInfo currentTrack={currentTrack} />
        {/* MUSIC CONTROLS */}
        <div className="flex h-full flex-shrink-0 items-center justify-end gap-3">
          <ControlButton
            onClick={handlePreviousTrack}
            icon={<FaBackward className="mr-0.5" />}
          />
          <ControlButton
            onClick={handlePausePlay}
            icon={
              paused ? (
                <FaPlay className="ml-1 text-2xl" />
              ) : (
                <FaPause className="text-2xl" />
              )
            }
            progress={progress}
          />
          <ControlButton
            onClick={handleNextTrack}
            icon={<FaForward className="ml-0.5" />}
          />
        </div>
      </div>
    </div>
  );
}

interface ControlButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  progress?: number;
}

function ControlButton({ onClick, icon, progress }: ControlButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cn(
        progress ? "size-12" : "size-9",
        "relative flex items-center justify-center overflow-hidden rounded-full text-center",
      )}
      whileTap={{ scale: 0.9 }}
    >
      <div className="z-10">{icon}</div>
      <div className="absolute inset-0 z-0 h-full w-full bg-[#C2C2C2] opacity-45 mix-blend-overlay" />
      {progress !== undefined && (
        <svg
          className="-rotate-90 absolute top-0 left-0 h-full w-full"
          viewBox="0 0 100 100"
        >
          <title>Progess Bar</title>
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
            r="47"
            fill="transparent"
            stroke="#fff"
            strokeWidth="6"
            strokeDasharray="295.31"
            strokeDashoffset={295.31 * (1 - progress / 100)}
            strokeLinecap="round"
          />
        </svg>
      )}
    </motion.button>
  );
}
