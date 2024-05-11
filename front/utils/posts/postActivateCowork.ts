import axios from "axios";
import ICompaniesInfo from "../types/companiesFormInterface";
const urlBase = process.env.NEXT_PUBLIC_API_URL;

const PostActivateCowork = async ({
  Id,
  token,
}: {
  Id: string;
  token: string | undefined;
}) => {
  const url = `${urlBase}/coworkings/activate`;
  const objetId = {
    id: Id,
  };

  try {
    const response = await axios.post(url, objetId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    console.log("la peticion fue exitosa");
  } catch (error) {
    console.log("hay un error", error);
  }
};

export default PostActivateCowork;
