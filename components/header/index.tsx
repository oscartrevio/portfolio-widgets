interface HeaderProps extends React.HTMLProps<HTMLAnchorElement> {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <div className="rounded-3xl bg-[#101010] p-8 font-bold font-sf-pro text-base text-white-a11">
      <h1>Oscar Treviño</h1>
      <h2 className="text-[#9E9E9E]">Design Engineer</h2>
      <p className="mt-4">
        Crafting 􀙄 seamless digital experiences and designing intuitive,
        human-centered 􀪤 interfaces. Obsessed with 􀰙 simplicity, innovation, and
        the smallest details.
      </p>
      <p className="mt-4">
        BS in 􀝒 Computer Science at Tecnológico de Monterrey.
      </p>
    </div>
  );
};

export default Header;
