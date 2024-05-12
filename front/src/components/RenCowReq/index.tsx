import { useEffect, useState } from "react";
import { useUserContext } from "@/components/context";
import Cookie from "js-cookie";
import getAllRequests from "../RedirectIn/getAllRequests";
import { RequestsCow } from "../RequestsCow";

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
            <h1 style={{marginBottom: "1rem", fontSize: "2.2rem", color: "#484848"}} >Solicitudes de Coworkings</h1>
            {requests.map((request) => (
                <RequestsCow cowork={request}/>
            ))}
        </div>
    );
};

export default RenCowReq;
