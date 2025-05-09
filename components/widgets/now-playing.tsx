import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { truncate } from "@/lib/utils";

import Image from "next/image";

export default async function NowPlaying() {
  const response = await fetch("http://localhost:3000/api/spotify?mode=now-playing", {
    cache: "no-store",
  });
  const data = await response.json();
  console.log(data);
  const nowPlaying = data;

  if (!nowPlaying?.songUrl || !nowPlaying.title || !nowPlaying.artist || !nowPlaying.isPlaying) {
    return (
      <div className="flex items-center justify-center space-x-2 text-sm sm:justify-start sm:text-base">
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
        <svg className="mt-[-2px] h-4 w-4" viewBox="0 0 168 168">
          <path
            fill="#1ED760"
            d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
          />
        </svg>
        <div className="inline-flex space-x-1">
          <p className="font-medium ">Not Playing</p>
          <span className="">{" – "}</span>
          <p className="">Spotify</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex ">
      <HoverCard>
        <HoverCardTrigger asChild>
          <a className="inline-block truncate font-medium" href={nowPlaying.songUrl} target="_blank" rel="noopener noreferrer">
            {truncate(nowPlaying.title, 24)}
          </a>
        </HoverCardTrigger>
        <HoverCardContent className="relative w-auto overflow-hidden rounded-3xl border-none ring-0">
          <div className="absolute inset-0 z-10 overflow-hidden">
            <div
              className="absolute inset-0 overflow-hidden rounded-3xl"
              style={{
                background: "rgba(0, 0, 0, 0.30)",
                backdropFilter: "blur(10px)",
              }}
            />
            <Image
              src={nowPlaying.albumImageUrl ?? ""}
              alt="Background"
              layout="fill"
              objectFit="cover"
              className="-z-10 saturate-200"
              loading="eager" // Preload on the server
            />
          </div>
          <div className="relative z-50 flex content-center justify-between space-x-4">
            <div className="h-24 w-24">
              <Image src={nowPlaying.albumImageUrl || ""} alt={`Album cover of ${nowPlaying.album}`} width={96} height={96} className="rounded-lg" />
            </div>
            <div className="flex flex-col gap-1 truncate text-nowrap tracking-tight">
              <h1 className="truncate bg-gradient-to-r overlay:bg-[rgba(255,255,255,1)] from-[rgba(255,255,255,0.35)] to-[rgba(255,255,255,0.35)] bg-clip-text font-semibold text-transparent text-xs uppercase bg-blend-normal">
                Now Playing
              </h1>
              <span className="leading-tight">
                <h2 className="truncate bg-gradient-to-r from-[rgba(255,255,255,0.8)] to-[rgba(255,255,255,0.8)] bg-clip-text font-semibold text-transparent">
                  {nowPlaying.title}
                </h2>
                <h2 className="truncate bg-gradient-to-r from-[rgba(255,255,255,0.5)] to-[rgba(255,255,255,0.5)] bg-clip-text font-normal text-sm text-transparent">
                  {nowPlaying.artist}
                </h2>
              </span>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      <span className="mx-2">{" — "}</span>
      <p className="inline-block truncate">{truncate(nowPlaying.artist, 20)}</p>
    </div>
  );
}
