"use client";
import React, { useState, useEffect } from "react";

import CoworkingCard from "./coworkingCard";
import IResponseCoworking from "../../../utils/types/coworkingsResponse";
import getCountriesfilter from "../../../utils/gets/countriesFilter";
import getoptions from "../../../utils/gets/getoptionsFilter";
import GetCoworkingsFilter from "../../../utils/gets/getCoworkingsFilter";

const Coworkings: React.FC = (): React.ReactElement => {
  const [coworkings, setCoworkings] = useState<IResponseCoworking[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [filter, setFilter] = useState({ country: "", state: "", city: "" });

  useEffect(() => {
    const getCountries = async () => {
      const countries = await getCountriesfilter();
      const currentcoworkings = await GetCoworkingsFilter({ filter });
      setCoworkings(currentcoworkings.coworking);
      setCountries(countries);
    };
    getCountries();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilter({ ...filter, [name]: value });

    console.log(filter);
  };
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
      } else if (filter.country) {
        setStates(options);
        const currentcoworkings = await GetCoworkingsFilter({ filter });
        setCoworkings(currentcoworkings.coworking);
      }
    };
    getOptions();
  }, [filter]);

  useEffect(() => {
    const fetchData = async () => {};
    fetchData();
  }, [filter]);

  return (
    <>
      <h1 className="m-auto text-center my-6  font-bold mt-28 text-custom-fourth text-5xl">
        Listado de Coworkings
      </h1>
      <form className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-8 text-custom-fourth my-8 ">
        <select
          className="m-auto text-center my-6 text-3xl font-bold border rounded bg-gray-100 px-4 py-2 focus:outline-none"
          name="country"
          onChange={handleChange}>
          <option value="">Selecciona un país</option>
          {countries.map((country) => (
            <option value={country} key={country}>
              {country}
            </option>
          ))}
        </select>
        <select
          className="m-auto text-center my-6 text-3xl font-bold border rounded bg-gray-100 px-4 py-2 focus:outline-none"
          name="state"
          onChange={handleChange}>
          <option value="">Selecciona un estado</option>
          {states.map((state) => (
            <option value={state} key={state}>
              {state}
            </option>
          ))}
        </select>
        <select
          className="m-auto text-center my-6 text-3xl font-bold border rounded bg-gray-100 px-4 py-2 focus:outline-none"
          name="city"
          onChange={handleChange}>
          <option value="">Selecciona una ciudad</option>
          {cities.map((city) => (
            <option value={city} key={city}>
              {city}
            </option>
          ))}
        </select>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:w-3/4 m-auto">
        {coworkings.map((coworking: IResponseCoworking) => (
          <div key={coworking.id}>
            <CoworkingCard coworking={coworking} />
          </div>
        ))}
      </div>
    </>
  );
};
export default Coworkings;
