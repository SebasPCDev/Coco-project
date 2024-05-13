"use client";
import { RiMenuLine, RiUserLine } from "@remixicon/react";
import Link from "next/link";
import { useUserContext } from "@/components/context";
import { useEffect, useState } from "react";
import Logout from "../logout";

const HeaderRight = () => {
  const [visibleLogin, setVisibleLogin] = useState("block");
  const [visibleProfile, setVisibleProfile] = useState("hidden");

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

  return (
    <div className=" mx-20">
      <div className={visibleLogin}>
        <div className="hidden md:block">
          <Link href="/login">
            <button className="flex bg-green-500 hover:bg-green-600 text-white font-bold py-5 px-10 rounded-full text-3xl">
              <RiUserLine color="#ffffff" />
              Login
            </button>
          </Link>
        </div>
      </div>
      <div className={` ${visibleProfile} gap-4 items-center `}>
        
        <div className="w-12 h-12 rounded-full bg-custom-primary flex justify-center items-center text-custom-secondary">
          {user?.name.slice(0, 1)}
        </div>
        <div className="text-custom-white text-3xl">{user?.name}</div>
        <Logout />
      </div>
    </div>
  );
};

export default HeaderRight;
