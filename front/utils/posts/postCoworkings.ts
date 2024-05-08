import axios from "axios";
import ICoworkingsInfo from "../types/coworkingsFormInterface";
const urlBase = process.env.NEXT_PUBLIC_API_URL;

const PostCoworkings = async (data: ICoworkingsInfo) => {
  const url = `${urlBase}/requests/coworking`;
  const datasend = {
    ...data,
    capacity: Number(data.capacity),
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

export default PostCoworkings;
