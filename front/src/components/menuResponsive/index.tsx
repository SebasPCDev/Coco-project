"use client";
import { RiBuildingLine, RiGroup2Line, RiLoginBoxLine } from "@remixicon/react";
import { useHeaderContext } from "../headerconstext";

import Link from "next/link";

const MenuResponsive = () => {
  const { isMenuActive, setMenuActive } = useHeaderContext();
  const handleClick = () => {
    setMenuActive(!isMenuActive);
  };
  return (
    <>
      {isMenuActive && (
        <nav className="mb-10">
          <ul className="flex flex-col gap-4 pt-2 ">
            <Link
              href="/login"
              className="flex flex-row gap-4 border-b-2"
              onClick={handleClick}>
              <RiLoginBoxLine color="black" />
              <li>LOGIN</li>
            </Link>
            <Link
              href="/companiesForm"
              className="flex flex-row gap-4 border-b-2"
              onClick={handleClick}>
              <RiGroup2Line color="black" />
              <li>EMPRESAS</li>
            </Link>
            <Link
              href="/"
              className="flex flex-row gap-4 border-b-2"
              onClick={handleClick}>
              <RiBuildingLine color="black" />
              <li>COWORKINGS</li>
            </Link>
          </ul>
        </nav>
      )}
    </>
  );
};

export default MenuResponsive;
