"use client";
import { RiLogoutBoxLine } from "@remixicon/react";
import { useUserContext } from "@/components/context";
import { useRouter } from "next/navigation";

import Cookie from "js-cookie";

const Logout = () => {
  const router = useRouter();
  const { setToken, setUser } = useUserContext();
  const handleClick = () => {
    setToken(undefined);
    setUser(undefined);
    Cookie.remove("token");
    Cookie.remove("user");
    router.push("/");
  };

  return (
    <div onClick={handleClick}>
      <RiLogoutBoxLine color="white" />
    </div>
  );
};

export default Logout;
