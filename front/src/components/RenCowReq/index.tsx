import { useEffect, useState } from "react";
import { useUserContext } from "@/components/context";
import Cookie from "js-cookie";
import getAllRequests from "../RedirectIn/getAllRequests";

export const RenCowReq = () => {    //_______------> RENDER COWORK REQUESTS
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
                const response = await getAllRequests(tokenEnCookies, "coworking");
                setRequests(response); // Establece el estado de requests con los datos obtenidos
            } catch (error) {
                console.error("Error al obtener las solicitudes:", error);
            }
        };

        fetchData();
    }, []); // Asegúrate de ejecutar este efecto cada vez que cambie tokenEnCookies

    return (
        <div>
            {requests.map((request) => (
                <div key={request.id}>
                    <p>{request.name}</p>
                    <br />
                    <p>{request.phone}</p>
                    <p>{request.companyName}</p>
                    <p>{request.type}</p>
                    
                    {/* Muestra otros datos de la solicitud según sea necesario */}
                </div>
            ))}
        </div>
    );
};

export default RenCowReq;
