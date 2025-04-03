import Image from "next/image";
import Link from "next/link";
import { BiSolidMoviePlay } from "react-icons/bi";
import { FaStar, FaStarHalf } from "react-icons/fa6";
import convert from "xml-js";

export default async function Movie() {
  const response = await fetch("https://letterboxd.com/oscartrevio/rss/", {
    cache: "no-store",
  });
  const xmlText = await response.text();

  const movieData = JSON.parse(
    convert.xml2json(xmlText, {
      compact: true,
      spaces: 2,
    }),
  );

  const movie = movieData.rss.channel.item[0];
  const title = movie["letterboxd:filmTitle"]._text;
  const year = movie["letterboxd:filmYear"]._text;
  const link = movie.link._text;
  const rating = Number.parseFloat(
    movie["letterboxd:memberRating"]?._text || "0",
  );
  const description = movie.description._cdata;

  const posterUrlMatch = description.match(/<img src="([^"]+)"/);
  const posterUrl = posterUrlMatch ? posterUrlMatch[1] : null;

  return (
    <>
      <div className="relative flex h-48 w-1/2 flex-col gap-1 overflow-hidden rounded-3xl bg-[#202830] p-5 text-white-a12 will-change-auto">
        <div className="flex justify-between">
          {posterUrl && (
            <Link href={link} target="_blank" rel="noopener noreferrer">
              <Image
                src={posterUrl}
                alt={`${title} Poster`}
                width={100}
                height={150}
                loading="eager"
                className="aspect-auto h-28 w-auto rounded-sm shadow-lg transition-transform duration-200 ease-in-out hover:scale-105"
              />
            </Link>
          )}
          <BiSolidMoviePlay className="text-2xl text-white" />
        </div>
        <div>
          <h2 className="truncate bg-gradient-to-r from-[rgba(255,255,255,0.8)] to-[rgba(255,255,255,0.8)] bg-clip-text font-semibold text-transparent">
            {title}{" "}
            <span className="truncate bg-gradient-to-r from-[rgba(255,255,255,0.3)] to-[rgba(255,255,255,0.3)] bg-clip-text font-normal text-transparent text-xs">
              {year}
            </span>
          </h2>
          <p className="flex text-[#00C030] text-sm">
            {rating !== null &&
              Array.from({ length: Math.floor(rating) }).map(() => (
                <FaStar key={crypto.randomUUID()} />
              ))}
            {rating !== null && rating % 1 >= 0.5 && (
              <FaStarHalf key={crypto.randomUUID()} />
            )}
          </p>
        </div>
      </div>
    </>
  );
}
