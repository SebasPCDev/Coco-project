import HeaderProvider from "../headerconstext";
import MenuResponsive from "../menuResponsive";
import HeaderLeft from "./headerLeft";
import HeaderRight from "./headerRight";

const Header = () => {
  return (
    <HeaderProvider>
      <header className="bg-slate-100 flex flex-row justify-between items-center p-5 ">
        <HeaderLeft />
        <HeaderRight />
      </header>
      <MenuResponsive />
    </HeaderProvider>
  );
};

export default Header;
