import clsx from "clsx";

interface HeaderProps extends React.HTMLProps<HTMLAnchorElement> {
  className?: string;
}

const Header = ({ className, children }: HeaderProps) => {
  return (
    <div className="absolute bg-[#101010] top-0 py-16 p-8 inset-x-0 text-white-a12 font-sf-pro font-bold text-base sm:top-4 sm:rounded-3xl sm:mx-2">
      <div>Oscar Treviño</div>
      <div className="text-[#9E9E9E] text-xs">Design Engineer</div>
      <div className="mt-4">
        Crafting 􀙄 seamless digital experiences and designing intuitive,
        human-centered 􀪤 interfaces. Obsessed with 􀰙 simplicity, innovation, and
        the smallest details.
      </div>
      <div className="mt-4">
        BS in 􀝒 Computer Science at Tecnológico de Monterrey.
      </div>
      {children}
    </div>
  );
};

export default Header;
