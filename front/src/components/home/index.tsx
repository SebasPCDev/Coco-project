"use client"
import Image from "next/image";
import ButtonClient from "../buttons";
import PromotionalComponent from "../mainAdvertisement";
import Banner from "../Banner";
import { About } from "../About";
import Service from "../Service";
import Coworks from "../Cowoks";
import Coworkings from "../coworkings";
import { useUserContext } from "@/components/context"; // Importa el contexto de usuario
import Cookie from "js-cookie";
import { useEffect, useState } from "react";


const home = () => {

  const { user } = useUserContext();
  const [userEnCookies, setUserEnCookies] = useState(Cookie.get("user"));
  const [role, setRole] = useState("");

  useEffect(() => {
      const userFromCookie = Cookie.get("user");
      setUserEnCookies(userFromCookie);
      if (user && user.role) {
        setRole(user.role);
      }
    }, [user]);



  
  return (
    <>
    {role == "superadmin" ? 
      <h1>Proximamente vista para superadmin</h1>
     :

     <div className="mb-20">
     <section>
       <div
         style={{
           display: "flex",
           flexDirection: "row",
           marginInlineStart: "2rem",
           gap: "2rem",
           paddingBlock: "1rem",
         }}
       >
         <ButtonClient
           buttonText="Soy Coworking"
           path="coworkingsForm"
           color="secondary"
         />
         <ButtonClient
           buttonText="Soy Empresa"
           path="companiesForm"
           color="secondary"
         />
       </div>
     </section>
     <Banner />
     <About />
     <Service />
     <Coworks />
     <Coworkings />
   </div>

   
    }
    </>
  );
};
export default home;
