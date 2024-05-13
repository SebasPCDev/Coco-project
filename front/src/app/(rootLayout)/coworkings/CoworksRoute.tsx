"use client";
import "./style.css";
import React, { useState, useEffect } from "react";
import {
  fetchCountries,
  generateAuthToken,
  fetchStates,
  fetchCities,
} from "./api";
import getAllCoworks from "@/service/getAllCoworks";
import FilterCoworks from "@/service/FilterCoworks";
import CoworkCard from "@/components/CoworkCard";
import IResponseCoworking from "../../../../utils/types/coworkingsResponse";
import getCountriesfilter from "../../../../utils/gets/countriesFilter";
import GetCoworkingsFilter from "../../../../utils/gets/getCoworkingsFilter";
import getoptions from "../../../../utils/gets/getoptionsFilter";
import { CgLayoutGrid } from "react-icons/cg";

/////////////
// Santiago
////////////

export const CoworksRoute: React.FC = () => {
  const [coworkings, setCoworkings] = useState<IResponseCoworking[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [filter, setFilter] = useState({ country: "", state: "", city: "" });

  useEffect(() => {
    const getCountries = async () => {
      const countries = await getCountriesfilter();
      console.log(countries);
      const currentcoworkings = await GetCoworkingsFilter({ filter });
      setCoworkings(currentcoworkings.coworking);
      setCountries(countries);
    };
    getCountries();
  }, []);

  useEffect(() => {
    const getOptions = async () => {
      const options = await getoptions({ filter });
      if (filter.city) {
        const currentcoworkings = await GetCoworkingsFilter({ filter });
        setCoworkings(currentcoworkings.coworking);
      } else if (filter.state) {
        setCities(options);
        const currentcoworkings = await GetCoworkingsFilter({ filter });
        setCoworkings(currentcoworkings.coworking);
      } else {
        if (filter.country) setStates(options);
        const currentcoworkings = await GetCoworkingsFilter({ filter });
        setCoworkings(currentcoworkings.coworking);
      }
    };
    getOptions();
  }, [filter]);

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    const newfilter = { country: "", state: "", city: "" };
    if (name === "country") {
      newfilter.country = value;
      newfilter.state = "";
      newfilter.city = "";
      setCities([]);
      setStates([]);
    }
    if (name === "state") {
      newfilter.country = filter.country;
      newfilter.state = value;
      newfilter.city = "";
      setCities([]);
    }
    if (name === "city") {
      newfilter.country = filter.country;
      newfilter.state = filter.state;
      newfilter.city = value;
    }
    setFilter(newfilter);
  };

  return (
    <section className="py-8 relative">
      <div className="w-full mx-auto px-4 md:px-8">
        <div className="">
          <div className="col-span-12 md:col-span-3 w-full max-md:max-w-md max-md:mx-auto">
            <div className="box rounded-xl  bg-white p-6 w-full">
              <div className="items-center mb-5 gap-1">
                <div className="input-container w-full my-2 !flex justify-evenly">
                  <div className="input-wrapper my-2 w-80">
                    <div className="h-15 rounded-full relative group w-full bg-gray-100 overflow-hidden before:absolute before:w-14 before:h-12 before:content[''] before:right-0 before:bg-green-300 before:rounded-full before:blur-lg before:[box-shadow:-60px_20px_10px_10px_#f7fac8] border border-gray-300 border-solid">
                      <svg
                        y="0"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0"
                        width="100"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid meet"
                        height="100"
                        className="absolute right-0 -rotate-45 stroke-gray-700 top-1.5 group-hover:rotate-0 duration-300"
                        style={{
                          width: "3rem",
                          height: "3rem",
                          marginRight: ".5rem",
                          marginTop: "1px",
                        }}
                      >
                        <path
                          strokeWidth="4"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          fill="none"
                          d="M60.7,53.6,50,64.3m0,0L39.3,53.6M50,64.3V35.7m0,46.4A32.1,32.1,0,1,1,82.1,50,32.1,32.1,0,0,1,50,82.1Z"
                          className="w-16 h-16 svg-stroke-primary"
                        ></path>
                      </svg>
                      <select
                        className=" appearance-none hover:placeholder-shown:bg-emerald-500 relative text-gray-600 bg-transparent ring-0 outline-none border border-neutral-500 placeholder-violet-700 font-bold focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
                        style={{
                          height: "4rem",
                          fontSize: "13px",
                          paddingLeft: "17px",
                          borderRadius: "99px",
                        }}
                        name="country"
                        id="country"
                        onChange={handleChange}
                      >
                        <option value="">País</option>
                        {countries.map((country, index) => (
                          <option value={country} key={`${country}-${index}`}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="input-wrapper my-2 w-80">
                    <div className="h-15 rounded-full relative group w-full bg-gray-100 overflow-hidden before:absolute before:w-14 before:h-12 before:content[''] before:right-0 before:bg-green-300 before:rounded-full before:blur-lg before:[box-shadow:-60px_20px_10px_10px_#f7fac8] border border-gray-300 border-solid before:rotate-45">
                      <svg
                        y="0"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0"
                        width="100"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid meet"
                        height="100"
                        className="absolute right-0 -rotate-45 stroke-gray-700 top-1.5 group-hover:rotate-0 duration-300"
                        style={{
                          width: "3rem",
                          height: "3rem",
                          marginRight: ".5rem",
                          marginTop: "1px",
                        }}
                      >
                        <path
                          strokeWidth="4"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          fill="none"
                          d="M60.7,53.6,50,64.3m0,0L39.3,53.6M50,64.3V35.7m0,46.4A32.1,32.1,0,1,1,82.1,50,32.1,32.1,0,0,1,50,82.1Z"
                          className="w-16 h-16 svg-stroke-primary"
                        ></path>
                      </svg>
                      <select
                        className=" appearance-none hover:placeholder-shown:bg-emerald-500 relative text-gray-600 bg-transparent ring-0 outline-none border border-neutral-500 placeholder-violet-700 font-bold focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
                        style={{
                          height: "4rem",
                          fontSize: "13px",
                          paddingLeft: "17px",
                          borderRadius: "99px",
                        }}
                        id="state"
                        name="state"
                        onChange={handleChange}
                      >
                        <option value="">Estado/provincia</option>
                        {states.map((state, index) => (
                          <option value={state} key={`${state}-${index}`}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="input-wrapper my-2 w-80">
                    <div className="h-15 rounded-full relative group w-full bg-gray-100 overflow-hidden before:absolute before:w-14 before:h-12 before:content[''] before:right-0 before:bg-green-300 before:rounded-full before:blur-lg before:[box-shadow:-60px_20px_10px_10px_#f7fac8] border border-gray-300 border-solid before:rotate-180">
                      <svg
                        y="0"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0"
                        width="100"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid meet"
                        height="100"
                        className="absolute right-0 -rotate-45 stroke-gray-700 top-1.5 group-hover:rotate-0 duration-300"
                        style={{
                          width: "3rem",
                          height: "3rem",
                          marginRight: ".5rem",
                          marginTop: "1px",
                        }}
                      >
                        <path
                          strokeWidth="4"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          fill="none"
                          d="M60.7,53.6,50,64.3m0,0L39.3,53.6M50,64.3V35.7m0,46.4A32.1,32.1,0,1,1,82.1,50,32.1,32.1,0,0,1,50,82.1Z"
                          className="w-16 h-16 svg-stroke-primary"
                        ></path>
                      </svg>
                      <select
                        className=" appearance-none hover:placeholder-shown:bg-emerald-500 relative text-gray-600 bg-transparent ring-0 outline-none border border-neutral-500 placeholder-violet-700 font-bold focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
                        style={{
                          height: "4rem",
                          fontSize: "13px",
                          paddingLeft: "17px",
                          borderRadius: "99px",
                        }}
                        id="city"
                        name="city"
                        onChange={handleChange}
                      >
                        <option value="">Ciudad</option>
                        {cities.map((city, index) => (
                          <option value={city} key={`${city}-${index}`}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <div className="container-coworks">
              <ul className="cowork-list">
                {coworkings.map((cowork) => {
                  return (
                    <li key={cowork.name}>
                      <CoworkCard cowork={cowork} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoworksRoute;
