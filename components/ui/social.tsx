import { cn } from "@/lib/utils";

import Link from "next/link";
import {
  FaGithub,
  FaGoodreads,
  FaLetterboxd,
  FaSpotify,
  FaStrava,
  FaXTwitter,
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
    icon: FaXTwitter,
  },
];

export default function Social() {
  return (
    <div className="flex gap-1">
      {data.map((item) => (
        <Link
          href={item.url}
          key={item.title}
          className={cn(
            "flex items-center rounded-full bg-[#101010] text-sm text-white-a11",
            item.title.length !== 0 ? "pe-2" : "px-0",
          )}
        >
          <div
            className={cn("p-2 text-xl", item.title.length > 1 ? "pr-1" : "")}
          >
            <item.icon />
          </div>
          {item.title}
        </Link>
      ))}
    </div>
  );
}
