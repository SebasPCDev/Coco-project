import axios from "axios";
import ICompaniesInfo from "../types/companiesFormInterface";
const urlBase = process.env.NEXT_PUBLIC_API_URL;

const PostActivateCowork = async (data: string) => {
  const url = `${urlBase}/coworkings/activate`;
  const objetId = {
    id: data,
  };

  try {
    const response = await axios.post(url, objetId, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);
    console.log("la peticion fue exitosa");
  } catch (error) {
    console.log("hay un error", error);
  }
};

export default PostActivateCowork;
