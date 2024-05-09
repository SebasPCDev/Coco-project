"use client";
import { RiBuildingLine, RiGroup2Line, RiLoginBoxLine } from "@remixicon/react";
import { useHeaderContext } from "../headerconstext";

import Link from "next/link";
import arrayNav from "../../../utils/arrayMenu/arrayMenuOrNav";

const MenuResponsive = () => {
  const { isMenuActive, setMenuActive } = useHeaderContext();
  const handleClick = () => {
    setMenuActive(!isMenuActive);
  };
  return (
    <>
      {isMenuActive && (
        <nav className="mb-10 md:hidden">
          <ul className="flex flex-col gap-4 pt-2 ">
            {arrayNav.map(({ path, name }) => (
              <Link
                href={path}
                className="flex flex-row gap-4 border-b-2"
                onClick={handleClick}
                key={name}>
                <li>{name}</li>
              </Link>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
};

export default MenuResponsive;
