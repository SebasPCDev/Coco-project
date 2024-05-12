import { useEffect, useState } from "react";
import { useUserContext } from "@/components/context";
import Cookie from "js-cookie";
import getAllRequests from "../RedirectIn/getAllRequests";

export const RenEmpReq = () => {    //_______------> RENDER EMPRESAS REQUESTS
    const { token } = useUserContext();
    const [tokenEnCookies, setTokenEnCookies] = useState(Cookie.get("token"));
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const tokenFromCookie = Cookie.get("token");
        setTokenEnCookies(tokenFromCookie);
    }, [token]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllRequests(tokenEnCookies, "company");
                setRequests(response); // Establece el estado de requests con los datos obtenidos
            } catch (error) {
                console.error("Error al obtener las solicitudes:", error);
            }
        };

        fetchData();
    }, []); 

    return (
        <div>
            {requests.map((request) => (
                <div key={request.id}>
                    <p>{request.name}</p>
                    <br />
                    <p>{request.phone}</p>
                    <p>{request.companyName}</p>
                    <p>{request.type}</p>
                </div>
            ))}
        </div>
    );
};

export default RenEmpReq;
