import { useEffect, useState } from "react";
import { useUserContext } from "@/components/context";
import Cookie from "js-cookie";
import getAllRequests from "../RedirectIn/getAllRequests";
import RequestsCom from "../RequestsCom";

export const RenEmpReq = () => {
  //_______------> RENDER EMPRESAS REQUESTS
  const { token } = useUserContext();
  const [tokenEnCookies, setTokenEnCookies] = useState(Cookie.get("token"));
  const [requests, setRequests] = useState([]);
  const fetchData = async () => {
    try {
      const response = await getAllRequests(tokenEnCookies, "company");
      const responseFiltered = response.filter(
        (req) => req.status === "pending"
      );
      setRequests(responseFiltered); // Establece el estado de requests con los datos obtenidos
    } catch (error) {
      console.error("Error al obtener las solicitudes:", error);
    }
  };

  useEffect(() => {
    const tokenFromCookie = Cookie.get("token");
    setTokenEnCookies(tokenFromCookie);
  }, [token]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1
        style={{ marginBottom: "1rem", fontSize: "2.2rem", color: "#484848" }}
      >
        Solicitudes de Empresas
      </h1>
      {requests.map((request) => (
        <RequestsCom company={request} fetchData={fetchData} />
      ))}
    </div>
  );
};

export default RenEmpReq;
