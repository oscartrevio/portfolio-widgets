import Image from "next/image";
import Link from "next/link";
import { FaStar, FaStarHalf } from "react-icons/fa6";
import convert from "xml-js";

export default async function Movie() {
  const response = await fetch("https://letterboxd.com/oscartrevio/rss/");
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
  const rating = Number.parseFloat(movie["letterboxd:memberRating"]._text);
  const description = movie.description._cdata;

  const posterUrlMatch = description.match(/<img src="([^"]+)"/);
  const posterUrl = posterUrlMatch ? posterUrlMatch[1] : null;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <>
      <div className="relative flex h-48 w-1/2 flex-col gap-1 overflow-hidden rounded-3xl bg-[#202830] p-5 text-white-a12 will-change-auto">
        {posterUrl && (
          <Link href={link} target="_blank" rel="noopener noreferrer">
            <Image
              src={posterUrl}
              alt={`${title} Poster`}
              width={100}
              height={150}
              loading="eager"
              className="aspect-auto h-28 w-auto rounded-sm shadow-lg"
            />
          </Link>
        )}
        <div>
          <h2 className="truncate font-semibold">
            {title}{" "}
            <span className="font-normal text-gray-400 text-xs">{year}</span>
          </h2>
          <p className="flex text-[#00C030] text-sm">
            {Array.from({ length: fullStars }, () => (
              <FaStar key={Math.random()} />
            ))}
            {hasHalfStar && <FaStarHalf />}
          </p>
        </div>
      </div>
    </>
  );
}
