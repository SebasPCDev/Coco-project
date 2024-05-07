import axios from "axios";
import ICompaniesInfo from "../types/companiesFormInterface";
import { headers } from "next/headers";
const urlBase = process.env.API_URL;

const PostCompany = async (data: ICompaniesInfo) => {
  const url = `http://localhost:3000/requests/company`;
  try {
    const response = await axios.post(
      "http://localhost:3000/requests/company",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    console.log("la peticion fue exitosa");
  } catch (error) {
    console.log("hay un error", error);
  }
};

export default PostCompany;

// import axios from "axios";
// import ICompaniesInfo from "../types/companiesFormInterface";
// const urlBase = process.env.API_URL;

// const PostCompany = async (data: ICompaniesInfo) => {
//   const url = `http://localhost:3000/requests/company`;
//   try {
//     const response = await axios.post(
//       "http://localhost:3000/requests/company",
//       JSON.stringify(data),
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log(response.data);
//     console.log("la peticion fue exitosa");
//   } catch (error) {
//     console.log("hay un error", error);
//   }
// };

// export default PostCompany;
