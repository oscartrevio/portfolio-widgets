import clsx from "clsx";

interface BookmarkProps extends React.HTMLProps<HTMLAnchorElement> {
  type: "bookmark" | "link";
  content?: string;
  href?: string;
  className?: string;
}

const Bookmark = ({ type, content, href, className, children }: BookmarkProps) => {
  return (
    <a target="_blank" rel="noopener noreferrer nofollow" className={clsx(className)} href={href}>
      {children}
    </a>
  );
};

export default Bookmark;
