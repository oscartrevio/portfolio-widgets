import { encode } from "blurhash";
import Image from "next/image";
import Link from "next/link";
import { Blurhash } from "react-blurhash";

interface Track {
  albumImageUrl: string;
  blurHash: string;
  href: string;
  title: string;
  artist: string;
  explicit: boolean;
}

export function TrackInfo({ currentTrack }: { currentTrack: Track }) {
  return (
    <div className="z-10 flex h-full w-full items-center gap-2">
      <Link
        href={currentTrack.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0"
      >
        <Image
          src={currentTrack.albumImageUrl}
          alt={"Album cover"}
          width={100}
          height={100}
          loading="eager" // Load album cover image on the server
          className="size-16 rounded-lg shadow-lg"
        />
      </Link>

      <div className="flex flex-col gap-1 truncate text-nowrap tracking-tight">
        <h1 className="truncate bg-gradient-to-r overlay:bg-[rgba(255,255,255,1)] from-[rgba(255,255,255,0.35)] to-[rgba(255,255,255,0.35)] bg-clip-text font-semibold text-transparent text-xs uppercase bg-blend-normal">
          Now Playing
        </h1>
        <span className="leading-tight">
          <h2 className="truncate bg-gradient-to-r from-[rgba(255,255,255,0.8)] to-[rgba(255,255,255,0.8)] bg-clip-text font-semibold text-transparent">
            {currentTrack.title}
            {/* TODO: Add explicit icon */}
            {/* <span>
              {currentTrack.explicit && (
                <span className="-mt-1 inline-block h-4 w-4">
                  <Image src={Explicit} alt="Explicit" width={16} height={16} />
                </span>
              )}
            </span> */}
          </h2>
          <h2 className="truncate bg-gradient-to-r from-[rgba(255,255,255,0.5)] to-[rgba(255,255,255,0.5)] bg-clip-text font-normal text-sm text-transparent">
            {currentTrack.artist}
          </h2>
        </span>
      </div>
    </div>
  );
}

export function BackgroundImage({ currentTrack }: { currentTrack: Track }) {
  return (
    <div className="absolute inset-0 rounded-3xl">
      <div
        className="absolute inset-0 overflow-hidden rounded-3xl"
        style={{
          background: "rgba(0, 0, 0, 0.30)",
        }}
      />
      <Blurhash
        hash={currentTrack.blurHash}
        className="-z-10 aspect-square h-auto w-full saturate-150"
      />
      {/* <Image
        src={currentTrack.albumImageUrl ?? ""}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="-z-10 saturate-200"
        loading="eager" // Preload on the server
      /> */}
    </div>
  );
}
