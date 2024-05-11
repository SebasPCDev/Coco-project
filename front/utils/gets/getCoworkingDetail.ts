import axios from "axios";


const urlBase = process.env.API_URL;

const GetCoworkingDetail = async (id: string) => {
  const url = `${urlBase}/coworkings/${id}`;

  try {
      const response = await axios.get(url);      

    return response.data;
    console.log("la petición ");
  } catch (error) {
    console.log("hay un error", error);
  }
};

export default GetCoworkingDetail;
