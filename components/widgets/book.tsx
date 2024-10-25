import Image from "next/image";
import Link from "next/link";
import { FaBookOpen } from "react-icons/fa6";
import convert from "xml-js";

export const dynamic = "force-dynamic";
export const revalidate = 1800;

export default async function Book() {
  const response = await fetch(
    "https://www.goodreads.com/review/list_rss/94271655?key=0XILryd6Ihv4HtlHuANh7yw8L4rYNAyiM3va4QtAhqkMoXd-&shelf=currently-reading",
    { cache: "no-store" },
  );
  const xmlText = await response.text();

  const bookData = JSON.parse(
    convert.xml2json(xmlText, {
      compact: true,
      spaces: 2,
    }),
  );

  // Debugging: Log the entire bookData object to verify its structure
  console.log("Parsed Book Data:", bookData);

  // Safely check if the items exist within the parsed object
  const items = bookData?.rss?.channel?.item;
  if (!items || items.length === 0) {
    console.log("No items found in RSS feed.");
    return <p>No book data found.</p>; // Handle the case where no book is found
  }

  // If there's only one book, items might not be an array, so handle both cases
  const book = Array.isArray(items) ? items[0] : items;

  // Extract the necessary book details
  const title = book.title?._text;
  const author = book.author_name?._text;
  const link = book.link?._cdata;
  const coverUrl = book.book_large_image_url?._cdata;
  const year = book.book_published?._text;

  return (
    <>
      <div className="relative flex h-48 w-1/2 flex-col gap-1 overflow-hidden rounded-3xl bg-gradient-to-b from-[#FFA800] to-[#E27614] p-5 text-white-a12 will-change-auto">
        <div className="flex justify-between">
          {coverUrl && (
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative"
            >
              <div
                className="absolute ml-0.5 h-full w-0.5"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0, 0, 0, 0.00) 17.39%, rgba(26, 29, 55, 0.50) 57.72%, rgba(0, 0, 0, 0.00) 101.84%)",
                }}
              />
              <Image
                src={coverUrl}
                alt={`${title} Cover`}
                width={100}
                height={150}
                loading="eager"
                className="h-28 w-auto rounded-sm transition-transform duration-200 ease-in-out hover:scale-105"
                style={{
                  boxShadow:
                    "0px 6px 8px 0px rgba(32, 31, 49, 0.25), 0px 0px 10px 0px rgba(42, 42, 48, 0.25) inset",
                }}
              />
            </Link>
          )}
          <FaBookOpen className="text-2xl text-white" />
        </div>
        <div className="leading-tight">
          <h2 className="truncate bg-gradient-to-r from-[rgba(255,255,255,0.8)] to-[rgba(255,255,255,0.8)] bg-clip-text font-semibold text-transparent">
            {title}{" "}
            <span className="truncate bg-gradient-to-r from-[rgba(255,255,255,0.5)] to-[rgba(255,255,255,0.5)] bg-clip-text font-normal text-transparent text-xs">
              {year}
            </span>
          </h2>
          <p className="truncate bg-gradient-to-r from-[rgba(255,255,255,0.5)] to-[rgba(255,255,255,0.5)] bg-clip-text font-normal text-sm text-transparent">
            {author}
          </p>
        </div>
      </div>
    </>
  );
}
