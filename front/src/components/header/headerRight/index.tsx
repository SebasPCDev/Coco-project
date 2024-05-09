"use client";
import { RiMenuLine, RiUserLine } from "@remixicon/react";
import { useHeaderContext } from "@/components/headerconstext";
import Link from "next/link";
import { useUserContext } from "@/components/context";
import { useEffect, useState } from "react";

const HeaderRight = () => {
  const [visibleLogin, setVisibleLogin] = useState("block");
  const [visibleProfile, setVisibleProfile] = useState("hidden");

  const { setMenuActive, isMenuActive } = useHeaderContext();
  const { user, token } = useUserContext();

  useEffect(() => {
    if (token) {
      setVisibleLogin("hidden");
      setVisibleProfile("flex");
    } else {
      setVisibleLogin("block");
      setVisibleProfile("hidden");
    }
  }, [token]);
  const handleClick = () => {
    setMenuActive(!isMenuActive);
  };
  return (
    <>
      <div onClick={handleClick} className="md:hidden">
        <RiMenuLine color="white" />
      </div>
      <div className={visibleLogin}>
        <div className="hidden md:block">
          <Link
            href="/login"
            className="text-custom-white flex flex-row gap-2 "
            onClick={handleClick}>
            <li className="list-none">Login</li>
            <RiUserLine color="white" />
          </Link>
        </div>
      </div>
      <div className={` ${visibleProfile} gap-2`}>
        <div className="w-6 h-6 rounded-full bg-custom-primary flex justify-center items-center text-custom-secondary">
          {user?.name.slice(0, 1)}
        </div>
        <div className="text-custom-white">{user?.name}</div>
      </div>
    </>
  );
};

export default HeaderRight;
