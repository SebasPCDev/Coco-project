"use client";
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
        <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
          <div className="">
            <div className="h-[9em] w-full border-1 border-[rgba(54,133,30,0.5)] rounded-[6px] bg-gradient-to-br from-[#97ef8a] to-[rgba(30,133,32,0.01)] text-gray-800 font-nunito p-[1em] flex justify-center items-left flex-col gap-[0.75em] backdrop-blur-[12px]">
              <div>
                <h1 className="text-[2em] font-medium text-center ">
                  Solicitudes Pendientes
                </h1>
              </div>
            </div>
          </div>

          <button
            onClick={handleOnClickView}
            value={"cow"}
            className="w-full bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
          >
            Coworkings
          </button>

          <button
            onClick={handleOnClickView}
            value={"com"}
            className="w-full bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
          >
            Companies
          </button>
        </div>
      </section>
      {/* <div class="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 h-32 overflow-y-scroll">
       */}

      <section className="mr-10 col-span-2 max-h-screen scrollbar-thumb-rounded-full scrollbar-thumb-lime-600 scrollbar-track-rounded-full scrollbar scrollbar-track-lime-200 scrollbar-w-3 overflow-y-scroll">
        {viewTemp === "cow" && <RenCowReq />}
        {viewTemp === "com" && <RenEmpReq />}
      </section>
    </main>
  );
};

export default SuperadminDashboardSup;
