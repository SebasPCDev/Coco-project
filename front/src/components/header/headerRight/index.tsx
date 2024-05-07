"use client";
import { RiMenuLine } from "@remixicon/react";
import { useHeaderContext } from "@/components/headerconstext";
import Link from "next/link";

const HeaderRight = () => {
  const { setMenuActive, isMenuActive } = useHeaderContext();
  const handleClick = () => {
    setMenuActive(!isMenuActive);
  };
  return (
    <>
      <div onClick={handleClick} className="md:hidden">
        <RiMenuLine color="white" />
      </div>
      <div className="hidden md:block">
        <Link href="/login" className="text-custom-white" onClick={handleClick}>
          <li>LOGIN</li>
        </Link>
      </div>
    </>
  );
};

export default HeaderRight;
