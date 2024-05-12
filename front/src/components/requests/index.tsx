"use client";
import { useEffect, useState } from "react";
import GetRequests from "../../../utils/gets/getRequests";
import { useUserContext } from "../context";
import CompanyList from "./request";
import { useRouter } from "next/navigation";

const Requests = ({ status, type }: { status: string; type: string }) => {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const { token } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) return router.push("/login"); //! Revisar!!
        const response = await GetRequests({ token, params: { status, type } });
        setRequests(response);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }

      console.log(requests);
      
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  return <>
  <CompanyList companies={requests} />
  <p>{requests}</p>
  </>;
};

export default Requests;
