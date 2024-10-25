import { cn } from "@/lib/utils";

import { addMilliseconds, format } from "date-fns";
import {
  Clock1,
  Clock2,
  Clock3,
  Clock4,
  Clock5,
  Clock6,
  Clock7,
  Clock8,
  Clock9,
  Clock10,
  Clock11,
  Clock12,
} from "lucide-react";
import { createElement } from "react";
import { FaRunning } from "react-icons/fa";
import convert from "xml-js";

const getClockIcon = (hour: number) => {
  const hourToIcon = [
    Clock12,
    Clock1,
    Clock2,
    Clock3,
    Clock4,
    Clock5,
    Clock6,
    Clock7,
    Clock8,
    Clock9,
    Clock10,
    Clock11,
  ];

  const normalizedHour = hour % 12;

  return hourToIcon[normalizedHour];
};

export default async function Run() {
  const response = await fetch("https://feedmyride.net/activities/131246761");
  const xmlText = await response.text();

  const runData = JSON.parse(
    convert.xml2json(xmlText, {
      compact: true,
      spaces: 2,
    }),
  );

  // Extracting the most recent activity
  const items = runData.rss.channel.item;
  const latestRun = items[0];

  const title = latestRun.title._text; // e.g., "Nike Run Club: Sunday Evening Run"
  const link = latestRun.link._text; // e.g., Strava activity link
  const description = latestRun.description?._text; // Safely accessing _text

  // Extracting distance and elapsed time from the description
  const distanceMatch = description.match(/Distance:\s*([\d\.]+)km/);
  const elapsedTimeMatch = description.match(/Moving Time:\s*([\d:\.]+)/);
  const pace = description.match(/Pace:\s*([\d:\.]+)/);

  const distanceInKilometers = distanceMatch
    ? Number.parseFloat(distanceMatch[1])
    : 0;
  const elapsedTimeString = elapsedTimeMatch ? elapsedTimeMatch[1] : "00:00:00";
  const paceString = pace ? pace[1] : "00:00";

  // Convert elapsed time to seconds
  const elapsedTimeParts = elapsedTimeString.split(":").map(Number);
  const elapsedTimeInSeconds =
    elapsedTimeParts[0] * 3600 + elapsedTimeParts[1] * 60 + elapsedTimeParts[2];

  // Extracting the date
  const startDate = new Date(latestRun.pubDate._text); // e.g., "Sun, 08 Sep 2024 18:18:58 -0600"

  return (
    <div
      className={cn(
        "relative flex h-24 w-full flex-grow-0 cursor-pointer select-none items-center justify-between overflow-hidden rounded-3xl bg-[#F5F5F7] p-4 text-black-a12 will-change-auto hover:cursor-pointer",
      )}
    >
      <div className="z-20 flex items-center gap-4">
        <div className="h-14 select-none rounded-full bg-[#086CFC] p-3">
          <FaRunning className="h-full w-auto text-white-a12" />
        </div>

        <div className="select-none">
          <div className="flex flex-col">
            <span className="inline-flex gap-2 font-bold text-xl">
              <h2>
                {distanceInKilometers.toFixed(2)}
                <span className="text-sm"> km</span>
              </h2>
              <p className="font-medium text-gray-200">|</p>
              <h2>
                {paceString} <span className="text-sm">/km</span>
              </h2>
            </span>
            <span className="inline-flex items-center font-medium">
              Run ・
              {createElement(getClockIcon(startDate.getHours()), {
                className: "mr-1 h-4 w-4",
              })}
              {format(startDate, "p")} -{" "}
              {format(
                addMilliseconds(startDate, elapsedTimeInSeconds * 1000),
                "p",
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
