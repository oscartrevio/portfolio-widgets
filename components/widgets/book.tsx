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
            <Link href={link} target="_blank" rel="noopener noreferrer">
              <Image
                src={coverUrl}
                alt={`${title} Cover`}
                width={100}
                height={150}
                loading="eager"
                className="aspect-auto h-28 w-auto rounded-sm shadow-lg transition-transform duration-200 ease-in-out hover:scale-105"
              />
            </Link>
          )}
          <FaBookOpen className="text-2xl text-white" />
        </div>
        <div>
          <h2 className="truncate font-semibold">
            {title}{" "}
            <span className="font-normal text-gray-400 text-xs">{year}</span>
          </h2>
          <p className="truncate font-medium text-gray-300 text-sm">{author}</p>
        </div>
      </div>
    </>
  );
}
