"use client"
import { useEffect } from "react";
import generateTimeOptions from "../../../utils/timeoptions/generateTimeOptions";
import IResponseCoworking from "../../../utils/types/coworkingsResponse";

const CoworkingDetailCard = ({
  coworking,
}: {
  coworking: IResponseCoworking;
}) => {


  useEffect(()=>{
    console.log(coworking);  
  },[])



  return (
    <>
      <h1>Esto es un ejemplo</h1>
    </>
  );
};

export default CoworkingDetailCard;
