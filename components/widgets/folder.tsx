"use client";

import type { Transition } from "framer-motion";

import { MotionConfig, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const transition: Transition = { type: "spring", bounce: 0, duration: 0.4 };

export default function Folder() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleStatus = () => setIsOpen(!isOpen);

  return (
    <MotionConfig transition={transition}>
      <button type="button" onClick={toggleStatus} className="relative h-48 w-1/2 rounded-3xl will-change-auto">
        <motion.svg
          initial={{
            backgroundImage: "linear-gradient(to bottom right, rgba(192,192,192,0.95) 0%, rgba(169,169,169,0.90) 100%)",
          }}
          animate={
            isOpen
              ? {
                  backgroundImage: "linear-gradient(to bottom right, rgba(192,192,192,1) 0%, rgba(169,169,169,1) 100%)",
                }
              : {}
          }
          style={{ backgroundAttachment: "fixed", clipPath: "url(#folder)" }}
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <clipPath id="folder" clipPathUnits="objectBoundingBox">
              <title>Folder</title>
              <path d="M.08 0A.08.08 0 000 .06v.8A.08.08 0 00.08.94H.92A.08.08 0 001 .86V.14A.08.08 0 00.92.06H.52C.44.06.44 0 .38 0H.1" />
            </clipPath>
          </defs>
        </motion.svg>

        <motion.div
          initial={{ x: 40, y: 95, translateX: "-50%", rotate: "4deg" }}
          animate={isOpen ? { x: 70, y: 0, rotate: "8deg" } : {}}
          className="-top-16 absolute left-1/2 aspect-[8.5/11] w-8 overflow-hidden rounded-2xl bg-white shadow-2xl"
        >
          <Image src={""} alt="Image of Stoic Inca" className="size-full object-cover object-bottom" />
        </motion.div>
        <motion.div
          initial={{ x: -40, y: 95, translateX: "-50%", rotate: "0deg" }}
          animate={isOpen ? { x: -70, y: 0, rotate: "-6deg" } : {}}
          className="-top-16 absolute left-1/2 aspect-[8.5/11] w-8 overflow-hidden rounded-2xl bg-white shadow-2xl"
        >
          <Image src={""} alt="Image of Playful Inca" className="size-full object-cover object-top" />
        </motion.div>
        <motion.div
          initial={{
            transform: "perspective(1100px) rotateX(0deg)",
          }}
          whileTap={{
            transform: "perspective(1100px) rotateX(-10deg)",
          }}
          animate={
            isOpen
              ? {
                  transform: "perspective(1100px) rotateX(-70deg)",
                }
              : {}
          }
          className="absolute bottom-0 left-0 grid h-40 w-full origin-bottom place-items-center rounded-[22px] bg-gradient-to-br from-[#d3d3d3] to-[#a9a9a9] shadow-[0_-1px_1px_1px_rgba(0,0,0,0.06),0_-6px_6px_3px_rgba(0,0,0,0.06),0_-3px_3px_1.5px_rgba(0,0,0,0.06),0_-12px_12px_6px_rgba(0,0,0,0.06),0_-24px_24px_12px_rgba(0,0,0,0.06)]"
        >
          <div className="relative size-3/4 overflow-hidden bg-[#808080] [mask:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIj4KICA8cGF0aCBkPSJtMTEuNjQ1IDIwLjkxLS4wMDctLjAwMy0uMDIyLS4wMTJhMTUuMjQ3IDE1LjI0NyAwIDAgMS0uMzgzLS4yMTggMjUuMTggMjUuMTggMCAwIDEtNC4yNDQtMy4xN0M0LjY4OCAxNS4zNiAyLjI1IDEyLjE3NCAyLjI1IDguMjUgMi4yNSA1LjMyMiA0LjcxNCAzIDcuNjg4IDNBNS41IDUuNSAwIDAgMSAxMiA1LjA1MiA1LjUgNS41IDAgMCAxIDE2LjMxMyAzYzIuOTczIDAgNS40MzcgMi4zMjIgNS40MzcgNS4yNSAwIDMuOTI1LTIuNDM4IDcuMTExLTQuNzM5IDkuMjU2YTI1LjE3NSAyNS4xNzUgMCAwIDEtNC4yNDQgMy4xNyAxNS4yNDcgMTUuMjQ3IDAgMCAxLS4zODMuMjE5bC0uMDIyLjAxMi0uMDA3LjAwNC0uMDAzLjAwMWEuNzUyLjc1MiAwIDAgMS0uNzA0IDBsLS4wMDMtLjAwMVoiIC8+Cjwvc3ZnPgo=)] [maskPosition:center] [maskRepeat:no-repeat]">
            <motion.div
              initial={{ y: 40, x: -60 }}
              animate={isOpen ? { y: -250, x: -200 } : {}}
              className="absolute size-[500px] rounded-full bg-[radial-gradient(at_center,rgba(211,211,211,1),rgba(211,211,211,0.3)_100%)]"
            />
            <motion.div
              initial={{ height: 0 }}
              animate={isOpen ? { height: "100%" } : {}}
              className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-30% from-[#808080]"
            />
          </div>
        </motion.div>
      </button>
    </MotionConfig>
  );
}
