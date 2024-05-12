"use client"
import React, { useEffect, useState } from "react";
import { useUserContext } from "@/components/context"; // Importa el contexto de usuario
import Cookie from "js-cookie";
import SideBar from "../SideBar";

export const SidebarOpt = ()=>{

    const { token } = useUserContext();
    const [tokenEnCookies, setTokenEnCookies] = useState(Cookie.get("token"));
  
    useEffect(() => {
      const tokenFromCookie = Cookie.get("token");
      setTokenEnCookies(tokenFromCookie);
    }, [token]);

    return (
        <>
            {token && <SideBar/>}
        </>
    );
}

export default SidebarOpt;