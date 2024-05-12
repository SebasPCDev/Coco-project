"use client"
import "./style.css"
import { useEffect, useState } from "react";
import RenCowReq from "../RenCowReq";
import RenEmpReq from "../RenCowReq copy";

export const SuperadminDashboardSup= ()=>{

  const [viewTemp, setViewTemp] = useState("cow")

  const handleOnClickView = (e)=>{
    const valueView = e.target.value;
    setViewTemp(valueView)
  }

return(
    <main style={{width: "100vw", height: "50rem", padding: "1.2rem", display: "flex", gap: "1rem", flexDirection: "row"}}>
        <section className="left-container" style={{width: "30%"}}>
                <div className="buttonview-container">
                <div className="moreinfo-left-container">
                <div
                      className="h-[9em] w-full border-1 border-[rgba(54,133,30,0.5)] rounded-[6px] bg-gradient-to-br from-[#97ef8a] to-[rgba(30,133,32,0.01)] text-gray-800 font-nunito p-[1em] flex justify-center items-left flex-col gap-[0.75em] backdrop-blur-[12px]"
                    >
                      <div>
                        <h1 className="text-[2em] font-medium">Heading</h1>
                        <p className="text-[0.85em]">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dolorum
                          blanditiis pariatur sequi magni.
                        </p>
                      </div>

                      <button
                        className="h-fit w-fit px-[1em] py-[0.5em] border-[1px] rounded-full flex justify-center items-center gap-[0.5em] overflow-hidden group hover:translate-y-[0.125em] duration-200 backdrop-blur-[12px]"
                      >
                        <p>Button</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="white"
                          viewBox="0 0 24 24"
                          stroke-width="1"
                          stroke="currentColor"
                          className="w-6 h-6 group-hover:translate-x-[10%] duration-300"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                          ></path>
                        </svg>
                      </button>
                </div>

                </div>

                <button onClick={handleOnClickView} value={"cow"} className="w-full hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-gradient-to-r from-green-300 to-green-400 text-gray-800">Coworkings</button>
                
                <button onClick={handleOnClickView} value={"com"} className="w-full hover:brightness-110 hover:animate-pulse font-bold py-3 px-6 rounded-full bg-gradient-to-r from-green-300 to-green-400 text-gray-800">Companies</button>
            </div>
        </section>
        <section className="right-container">
                {viewTemp === "cow" && <RenCowReq/>}
                {viewTemp === "com" && <RenEmpReq/>}
        </section>
    </main>
)

    
}

export default SuperadminDashboardSup;