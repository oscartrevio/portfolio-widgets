import Image from "next/image";

export default function Music() {
  return (
    <>
      <div className="relative flex h-24 items-center justify-between gap-4 overflow-hidden rounded-3xl p-6 font-sf-pro text-white-a12">
        <div
          className="-z-10 absolute inset-0 contrast-[.95] saturate-200"
          style={{
            background:
              'url("https://media.pitchfork.com/photos/65772273239ec61ed8f07f5c/master/pass/Childish-Gambino-Awaken-My-Love.jpg") lightgray 50% / cover no-repeat',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            borderRadius: "1.375rem",
            background: "rgba(0, 0, 0, 0.30)",
            backdropFilter: "blur(20px)",
          }}
        />
        <div className="z-10 flex items-center gap-4">
          <Image
            src={
              "https://media.pitchfork.com/photos/65772273239ec61ed8f07f5c/master/pass/Childish-Gambino-Awaken-My-Love.jpg"
            }
            alt={"Album cover"}
            width={100}
            height={100}
            className="size-16 rounded-lg"
            style={{
              boxShadow: "0px 2px 12px 2.5px rgba(0, 0, 0, 0.32)",
            }}
          />
          <div className="flex flex-col gap-2">
            <h1 className="bg-gradient-to-r overlay:bg-[rgba(255,255,255,1)] from-[rgba(255,255,255,0.35)] to-[rgba(255,255,255,0.35)] bg-clip-text font-semibold text-[10px] text-transparent uppercase bg-blend-normal">
              Now Playing
            </h1>
            <span>
              <h1 className="bg-gradient-to-r overlay:bg-[rgba(255,255,255,1)] from-[rgba(255,255,255,0.8)] to-[rgba(255,255,255,0.8)] bg-clip-text font-semibold text-base text-transparent leading-none bg-blend-normal">
                Redbone
              </h1>
              <h1 className="bg-gradient-to-r overlay:bg-[rgba(255,255,255,1)] from-[rgba(255,255,255,0.35)] to-[rgba(255,255,255,0.35)] bg-clip-text font-normal text-sm text-transparent bg-blend-normal">
                Childish Gambino
              </h1>
            </span>
          </div>
        </div>
        {/* MUSIC CONTROLS */}
        <div className="relative flex items-center gap-3">
          <div className="relative flex size-10 items-center justify-center overflow-hidden rounded-full text-center">
            <div className="z-10">􀊊</div>
            <div className="absolute inset-0 z-0 h-full w-full bg-[#C2C2C2] opacity-45 mix-blend-overlay" />
            <div className="absolute inset-0 z-0 h-full w-full bg-[#7F7F7F] opacity-20 mix-blend-luminosity" />
          </div>
          <div className="relative flex size-14 items-center justify-center overflow-hidden rounded-full text-center">
            <div className="z-10 text-3xl">􀊆</div>
            <div className="absolute z-0 h-full w-full bg-[#C2C2C2] opacity-45 mix-blend-overlay" />
            <div className="absolute z-0 h-full w-full bg-[#7F7F7F] opacity-20 mix-blend-luminosity" />
          </div>
          <div className="relative flex size-10 items-center justify-center overflow-hidden rounded-full text-center">
            <div className="z-10">􀊌</div>
            <div className="absolute z-0 h-full w-full bg-[#C2C2C2] opacity-45 mix-blend-overlay" />
            <div className="absolute z-0 h-full w-full bg-[#7F7F7F] opacity-20 mix-blend-luminosity" />
          </div>
        </div>
      </div>
    </>
  );
}

// <div>
//         <h1>Music</h1>
//         <p>
//           Music is a big part of my life. I've been playing guitar for over 20
//           years and have been in a few bands. I also enjoy listening to music
//           and have a wide range of tastes. I'm always on the lookout for new
//           music to listen to. Here are a few of my favorite artists:
//         </p>
//         <ul>
//           <li>The Beatles</li>
//           <li>Radiohead</li>
//           <li>Bob Dylan</li>
//           <li>Neil Young</li>
//           <li>Wilco</li>
//         </ul>
//       </div>
