import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  FaGithub,
  FaGoodreads,
  FaLetterboxd,
  FaSpotify,
  FaStrava,
} from "react-icons/fa6";

const data = [
  {
    title: "@oscartrevio",
    url: "#",
    icon: FaGithub,
  },
  {
    title: "",
    url: "#",
    icon: FaSpotify,
  },
  {
    title: "",
    url: "#",
    icon: FaLetterboxd,
  },
  {
    title: "",
    url: "#",
    icon: FaGoodreads,
  },
  {
    title: "",
    url: "#",
    icon: FaStrava,
  },
];

export default function Social() {
  return (
    <div className="flex gap-1">
      {data.map((item) => (
        // <Button
        //   key={item.title}
        //   className="flex items-center rounded-full bg-[#101010] py-0 ps-1 text-white-a11"
        // >
        //   <div className="p-1.5 text-xl">
        //     <item.icon />
        //   </div>
        //   {item.title}
        // </Button>
        <Button
          key={item.title}
          className={cn(
            "flex items-center rounded-full bg-[#101010] py-0 ps-0 text-white-a11",
            item.title.length !== 0 ? "" : "px-0",
          )}
        >
          <div className="p-2 text-xl">
            <item.icon />
          </div>
          {item.title === "@oscartrevio" ? item.title : null}
        </Button>
      ))}
    </div>
  );
}
