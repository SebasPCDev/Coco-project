import axios from "axios";

import ILoginForm from "../types/loginFormInterface";
const urlBase = process.env.NEXT_PUBLIC_API_URL;

const PostLogin = async (data: ILoginForm) => {
  const url = `${urlBase}/auth/signin`;

  const dataResponseHarcoded = {
    user: {
      id: "119dd9ec-8e02-457b-a531-243f21926f89",
      name: "Coco",
      lastname: "Plus",
      phone: "311223332",
      email: "cocoplus2024@gmail.com",
      identification: "123456789",
      position: "Superadmin",
      recoveryToken: null,
      activationDate: null,
      role: "superadmin",
      status: "active",
    },
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTlkZDllYy04ZTAyLTQ1N2ItYTUzMS0yNDNmMjE5MjZmODkiLCJpZCI6IjExOWRkOWVjLThlMDItNDU3Yi1hNTMxLTI0M2YyMTkyNmY4OSIsImVtYWlsIjoiY29jb3BsdXMyMDI0QGdtYWlsLmNvbSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzE1MTQwNTIxfQ.hAtfvyJhKYPOtID27szd4OfU3TYRhBp0I8MRtBTvlfg",
  };

  return dataResponseHarcoded;
  // try {
  //   const response = await axios.post(url, data, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   console.log(response.data);
  //   return response.data;
  //   console.log("la peticion fue exitosa");
  // } catch (error) {
  //   console.log("hay un error", error);
  // }
};

export default PostLogin;
