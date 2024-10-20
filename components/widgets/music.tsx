"use client";

import Image from "next/image";
import { useState } from "react";

interface Track {
  albumImageUrl: string;
  title: string;
  artist: string;
  explicit: boolean;
}

const songs: Track[] = [
  {
    albumImageUrl:
      "https://media.pitchfork.com/photos/65772273239ec61ed8f07f5c/master/pass/Childish-Gambino-Awaken-My-Love.jpg",
    title: "Redbone",
    artist: "Childish Gambino",
    explicit: true,
  },
  {
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2739852437d39690c760e108a14",
    title: "What You Heard",
    artist: "Sonder",
    explicit: true,
  },
  {
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273175c577a61aa13d4fb4b6534",
    title: "Wings",
    artist: "Mac Miller",
    explicit: true,
  },
  {
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b273d18fa8f63707115cb1b38f65",
    title: "Still Beating",
    artist: "Mac DeMarco",
    explicit: false,
  },
  {
    albumImageUrl:
      "https://i.scdn.co/image/ab67616d0000b2739164bafe9aaa168d93f4816a",
    title: "Sparks",
    artist: "Coldplay",
    explicit: false,
  },
];

export default function Music() {
  const [tracks] = useState(songs);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  const handlePreviousTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1,
    );
  };

  const handlePausePlay = () => {
    setPaused((prevPaused) => !prevPaused);
  };

  const currentTrack = tracks[currentTrackIndex];

  return (
    <>
      <div className="relative flex h-24 items-center justify-between overflow-hidden rounded-3xl p-4 font-sf-pro text-white-a12">
        <div
          className="-z-10 absolute inset-0 saturate-200"
          style={{
            background: `url("${currentTrack.albumImageUrl ?? undefined}") lightgray 50% / cover no-repeat`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "rgba(0, 0, 0, 0.50)",
            backdropFilter: "blur(16px)",
          }}
        />
        <div className="z-10 flex items-center gap-2">
          <Image
            src={currentTrack.albumImageUrl}
            alt={"Album cover"}
            width={100}
            height={100}
            className="size-16 rounded-lg"
            style={{
              boxShadow: "0px 2px 12px 2.5px rgba(0, 0, 0, 0.32)",
            }}
          />
          <div className="flex w-full flex-col gap-1 text-nowrap">
            <h1 className="bg-gradient-to-r overlay:bg-[rgba(255,255,255,1)] from-[rgba(255,255,255,0.35)] to-[rgba(255,255,255,0.35)] bg-clip-text font-semibold text-transparent text-xs uppercase bg-blend-normal">
              Now Playing
            </h1>
            <span className="text-nowrap leading-tight">
              <h1 className="flex items-baseline gap-1 text-nowrap bg-gradient-to-r overlay:bg-[rgba(255,255,255,1)] from-[rgba(255,255,255,0.8)] to-[rgba(255,255,255,0.8)] bg-clip-text font-semibold text-base text-transparent bg-blend-normal">
                {currentTrack.title}{" "}
                <span className="text-sm text-white-a12 opacity-50 mix-blend-overlay">
                  {currentTrack.explicit && "􀂝"}
                </span>
              </h1>
              <h1 className="text-nowrap bg-gradient-to-r overlay:bg-[rgba(255,255,255,1)] from-[rgba(255,255,255,0.5)] to-[rgba(255,255,255,0.5)] bg-clip-text font-normal text-transparent bg-blend-normal">
                {currentTrack.artist}
              </h1>
            </span>
          </div>
        </div>
        {/* MUSIC CONTROLS */}
        <div className="relative z-30 flex h-full items-center gap-3">
          <button
            type="button"
            onClick={handlePreviousTrack}
            className="relative flex size-9 items-center justify-center overflow-hidden rounded-full text-center"
          >
            <div className="z-10">􀊊</div>
            <div className="absolute inset-0 z-0 h-full w-full bg-[#C2C2C2] opacity-45 mix-blend-overlay" />
            <div className="absolute inset-0 z-0 h-full w-full bg-[#7F7F7F] opacity-20 mix-blend-luminosity" />
          </button>
          <button
            type="button"
            onClick={handlePausePlay}
            className="relative flex size-12 items-center justify-center overflow-hidden rounded-full text-center"
          >
            <div className="z-10 text-3xl">{paused ? "􀊄" : "􀊆"}</div>
            <div className="absolute z-0 h-full w-full bg-[#C2C2C2] opacity-45 mix-blend-overlay" />
            <div className="absolute z-0 h-full w-full bg-[#7F7F7F] opacity-20 mix-blend-luminosity" />
          </button>
          <button
            type="button"
            onClick={handleNextTrack}
            className="relative flex size-9 items-center justify-center overflow-hidden rounded-full text-center"
          >
            <div className="z-10">􀊌</div>
            <div className="absolute z-0 h-full w-full bg-[#C2C2C2] opacity-45 mix-blend-overlay" />
            <div className="absolute z-0 h-full w-full bg-[#7F7F7F] opacity-20 mix-blend-luminosity" />
          </button>
        </div>
      </div>
    </>
  );
}
