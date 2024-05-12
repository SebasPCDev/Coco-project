import axios, { AxiosResponse } from "axios";
const urlBase = process.env.NEXT_PUBLIC_API_URL;

interface IRequestData {
  id: string;
  name: string;
  lastname: string;
  phone: string;
  email: string;
  identification: string;
  position: string;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  quantityBeneficiaries: number | null;
  businessSector: string | null;
  size: number | null;
  address: string;
  website: string;
  open: string;
  close: string;
  capacity: number;
  message: string;
  status: string;
  observation: string;
  type: string;
}

export const getAllRequests = async (token: string, reqType: string): Promise<IRequestData[]> => {
  try {
    const response: AxiosResponse<IRequestData[]> = await axios.get<IRequestData[]>(
      `${urlBase}/requests/?type=${reqType}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    console.log(response.data)
    return response.data; // Retorna solo la propiedad .data de la respuesta
    
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    throw error;
  }
};

export default getAllRequests;
