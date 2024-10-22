import { IoHammerOutline } from "react-icons/io5";
import { PiBookBookmark, PiHandTap, PiSparkle } from "react-icons/pi";

interface HeaderProps extends React.HTMLProps<HTMLAnchorElement> {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <div className="rounded-3xl bg-[#101010] p-8 font-semibold text-base text-white-a11 leading-tight">
      <h1>Oscar Treviño</h1>
      <h2 className="text-[#9E9E9E] text-sm">Design Engineer</h2>
      <p className="mt-4">
        Crafting <IoHammerOutline className="inline text-2xl" /> seamless
        digital experiences and designing intuitive, human-centered{" "}
        <PiHandTap className="inline text-2xl" /> interfaces. Obsessed with{" "}
        <PiSparkle className="inline text-2xl" /> simplicity, innovation, and
        the smallest details.
      </p>
      <p className="mt-2">
        BS in <PiBookBookmark className="inline text-2xl" /> Computer Science at
        Tecnológico de Monterrey.
      </p>
    </div>
  );
};

export default Header;
