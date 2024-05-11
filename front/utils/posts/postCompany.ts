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
  const response = await axios.post(url, datasend, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response.data);
  return response.data;
  console.log("la peticion fue exitosa");

  // try {

  // } catch (error) {
  //   console.log("hay un error", error);
  // }
};

export default PostCompany;
