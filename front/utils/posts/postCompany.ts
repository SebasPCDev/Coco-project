import axios from "axios";
import ICompaniesInfo from "../types/companiesFormInterface";
const urlBase = process.env.NEXT_PUBLIC_API_URL;

const PostCompany = async (data: ICompaniesInfo) => {
  const url = `${urlBase}/requests/company`;
  const datasend = {
    ...data,
    size: Number(data.size),
    quantityBeneficiaries: Number(data.quantityBeneficiaries),
  };

  try {
    const response = await axios.post(url, datasend, {
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

export default PostCompany;
