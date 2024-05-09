"use client";
import { useEffect, useState } from "react";
import GetRequests from "../../../utils/gets/getRequests";
import { useUserContext } from "../context";
import CompanyList from "./request";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const { token } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetRequests({ token, params: null });
        setRequests(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchData();
  }, [token]);

    return <CompanyList companies={requests} />;
};

export default Requests;
