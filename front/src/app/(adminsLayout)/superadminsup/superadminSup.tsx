"use client"
import { useEffect, useState } from "react";
import { useUserContext } from "@/components/context"; // Importa el contexto de usuario
import Cookie from "js-cookie";
import redirectionByRole from "../../../../utils/ redirects/redirectByRole"
import { useRouter } from "next/navigation";
import SuperadminDashboardSup from "@/components/SuperadminDashboardSup";
import RedirectedIn from "@/components/RedirectIn";

export const superadminSup= ()=>{
    const router = useRouter();

    const { token } = useUserContext();
    const [tokenEnCookies, setTokenEnCookies] = useState(Cookie.get("token"));

    const { user } = useUserContext();
    const [userEnCookies, setUserEnCookies] = useState(Cookie.get("user"));
    const [role, setRole] = useState("");

    useEffect(() => {
    const tokenFromCookie = Cookie.get("token");
    setTokenEnCookies(tokenFromCookie);
    }, [token]);

    useEffect(() => {
        const userFromCookie = Cookie.get("user");
        setUserEnCookies(userFromCookie);
        if (user && user.role) {
          setRole(user.role);
          if (user.role !== "superadmin") {
            const routeToRedirect = redirectionByRole(user.role);
            router.push(routeToRedirect);
          }
        }
      }, [user]);
    
return(
    <>
        {role !== "superadmin" ? <RedirectedIn/> : <SuperadminDashboardSup/>}
    </>
)

    
}

export default superadminSup;