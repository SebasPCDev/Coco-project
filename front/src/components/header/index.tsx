import HeaderProvider from "../headerconstext";
import MenuResponsive from "../menuResponsive";
import HeaderLeft from "./headerLeft";
import HeaderRight from "./headerRight";

const Header = () => {
  return (
    <HeaderProvider>
      <header className=" bg-custom-secondary py-4">
        <div className="w-3/4 m-auto flex flex-row justify-between items-center ">
          <HeaderLeft />
          <HeaderRight />
        </div>
      </header>
      <MenuResponsive />
    </HeaderProvider>
  );
};

export default Header;
