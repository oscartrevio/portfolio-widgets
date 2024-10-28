import Image from "next/image";
import { FaLocationArrow } from "react-icons/fa6";

export default function Location() {
  return (
    <>
      <div className="relative flex h-48 overflow-hidden rounded-3xl text-white-a12 will-change-auto">
        <Image
          src="/assets/cloud.webp"
          width="390"
          height="347"
          alt=""
          draggable="false"
          className="absolute z-20 animate-cloud opacity-75 blur-sm"
        />
        <Image
          src="/assets/plane.webp"
          width="24"
          height="56"
          alt=""
          draggable="false"
          className="z-20 h-14 w-auto animate-plane"
        />
        <Image
          src="/assets/plane-shadow.webp"
          width="24"
          height="24"
          alt=""
          draggable="false"
          className="absolute z-20 mt-10 animate-plane-shadow"
        />
        <Image
          width="500"
          height="250"
          src="/assets/map.webp"
          alt="Map of Monterrey, NL"
          loading="eager"
          draggable="false"
          className="absolute inset-0 z-10 h-full w-full object-cover"
        />
        <div aria-hidden>
          <div className="absolute top-1/2 left-1/3 z-10 h-6 w-6 animate-marker rounded-full bg-blue-500" />
          <div className="absolute top-1/2 left-1/3 z-10 h-6 w-6 rounded-full border-4 border-neutral-50 bg-blue-500 shadow-sm" />
        </div>
        <h1 className="absolute right-0 bottom-0 z-30 flex items-center gap-1 bg-gradient-to-r from-[rgba(0,0,0,0.8)] to-[rgba(0,0,0,0.8)] bg-clip-text px-4 py-3 font-semibold text-transparent tracking-tight">
          <FaLocationArrow className="inline items-center text-[rgba(0,0,0,0.8)] " />
          Based in Mexico
        </h1>
        <div className="pointer-events-none fixed bottom-0 left-0 z-20 h-20 w-full rotate-180">
          {/* Bottom gradient */}
          <div
            className="block h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(180deg, #fff 0%, hsla(0, 0%, 100%, 0.738) 19%, hsla(0, 0%, 100%, 0.541) 34%, hsla(0, 0%, 100%, 0.382) 47%, hsla(0, 0%, 100%, 0.278) 56.5%, hsla(0, 0%, 100%, 0.194) 65%, hsla(0, 0%, 100%, 0.126) 73%, hsla(0, 0%, 100%, 0.075) 80.2%, hsla(0, 0%, 100%, 0.042) 86.1%, hsla(0, 0%, 100%, 0.021) 91%, hsla(0, 0%, 100%, 0.008) 95.2%, hsla(0, 0%, 100%, 0.002) 98.2%, hsla(0, 0%, 100%, 0) 100%)",
            }}
          />
        </div>
      </div>
    </>
  );
}
