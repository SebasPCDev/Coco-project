import axios from "axios";
import ICompaniesInfo from "../types/companiesFormInterface";
const urlBase = process.env.API_URL;

const PostCompany = async (data: ICompaniesInfo) => {
  const url = `${urlBase}/requests/company`;
  try {
    const response = await axios.post(url, data);
      console.log(response.data);
      console.log("la peticion fue exitosa");
      
  } catch (error) {
    console.log("hay un error", error);
  }
};

export default PostCompany;
