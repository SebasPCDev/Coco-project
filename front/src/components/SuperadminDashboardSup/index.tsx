"use client";
import "./style.css";
import { useEffect, useState } from "react";
import RenCowReq from "../RenCowReq";
import RenEmpReq from "../RenEmpReq";

export const SuperadminDashboardSup = () => {
  const [viewTemp, setViewTemp] = useState("cow");

  const handleOnClickView = (e: any) => {
    const valueView = e.target.value;
    setViewTemp(valueView);
  };

  return (
    <main className="grid grid-cols-3 flex-row gap-5 mt-10 px-20 min-h-full">
      <section className="">
        <div className="buttonview-container button">
          <div className="">
            <div className="h-[9em] w-full border-1 border-[rgba(54,133,30,0.5)] rounded-[6px] bg-gradient-to-br from-[#97ef8a] to-[rgba(30,133,32,0.01)] text-gray-800 font-nunito p-[1em] flex justify-center items-left flex-col gap-[0.75em] backdrop-blur-[12px]">
              <div>
                <h1 className="text-[2em] font-medium text-center">
                  Solicitudes Pendientes
                </h1>
              </div>
            </div>
          </div>

          <button
            onClick={handleOnClickView}
            value={"cow"}
            className="w-full hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-gradient-to-r from-green-300 to-green-400 text-gray-800"
          >
            Coworkings
          </button>

          <button
            onClick={handleOnClickView}
            value={"com"}
            className="w-full hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-gradient-to-r from-green-300 to-green-400 text-gray-800"
          >
            Companies
          </button>
        </div>
      </section>
      <section className="mr-10 col-span-2 max-h-screen overflow-scroll">
        {viewTemp === "cow" && <RenCowReq />}
        {viewTemp === "com" && <RenEmpReq />}
      </section>
    </main>
  );
};

export default SuperadminDashboardSup;
