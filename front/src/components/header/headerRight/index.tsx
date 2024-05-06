"use client";
import { RiMenuLine } from "@remixicon/react";
import { useHeaderContext } from "@/components/headerconstext";

const HeaderRight = () => {
  const { setMenuActive, isMenuActive } = useHeaderContext();
  const handleClick = () => {
    setMenuActive(!isMenuActive);
  }
  return (
    <div onClick={handleClick}>
      <RiMenuLine color="black" />
    </div>
  );
};

export default HeaderRight;
