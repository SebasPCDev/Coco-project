"use client";
import { RiLogoutBoxLine } from "@remixicon/react";
import { useUserContext } from "@/components/context";
import { useRouter } from "next/navigation";

import Cookie from "js-cookie";
import Swal from "sweetalert2";

const Logout = () => {
  const router = useRouter();
  const { setToken, setUser } = useUserContext();
  const handleClick = async () => {
    await Swal.fire({
      title: "¿Seguro que quieres cerrar sesión?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Si, cerrar sesión",
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await Swal.fire({
          title: "Sesión cerrada",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        setToken(undefined);
        setUser(undefined);
        Cookie.remove("token");
        Cookie.remove("user");
        router.push("/");
      } else if (result.isDenied) {
        return;
      }
    });
  };

  return (
    <div onClick={handleClick}>
      <RiLogoutBoxLine color="white" />
    </div>
  );
};

export default Logout;
