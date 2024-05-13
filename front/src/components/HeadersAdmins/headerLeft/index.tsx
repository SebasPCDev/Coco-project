import Link from "next/link";
import NavBarLanding from "../../navBarLanding";

const HeaderLeft = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/">
          <img className="h-48 w-45" src="/LimaSinFondo.png" alt="Coco+" />
        </Link>
        <div className="hidden md:flex items-center space-x-12 ml-12"></div>
      </div>
    </div>
  );
};

export default HeaderLeft;
