import axios from "axios";
interface IFilterOptions {
  country?: string;
  state?: string;
  city?: string;
}

const urlBase = process.env.NEXT_PUBLIC_API_URL;

const GetCoworkingsFilter = async ({ filter }: { filter: IFilterOptions }) => {
  let url = `${urlBase}/coworkings`;

  try {
    const response = await axios.get(url, {
      params: filter, // Esto agregará los parámetros como una cadena de consulta
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching coworkings:", error);
    throw error;
  }
};

export default GetCoworkingsFilter;
