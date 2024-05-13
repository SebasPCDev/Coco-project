import HeaderProvider from "../headerconstext";
import MenuResponsive from "../menuResponsive";
import HeaderLeft from "./headerLeft";
import HeaderRight from "./headerRight";

const HeaderAdmins = () => {
  return (
    <header className="bg-zinc-950 shadow font-sans">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 flex flex-row justify-between items-center">
        <HeaderLeft />
        <HeaderRight />
      </div>
    </header>
  );
};

export default HeaderAdmins;
