"use client"
import "./style.css"
import React, { useState, useEffect } from 'react';
import { fetchCountries, generateAuthToken, fetchStates, fetchCities } from './api';
import getAllCoworks from "@/service/getAllCoworks";
import FilterCoworks from "@/service/FilterCoworks";
import CoworkCard from '@/components/CoworkCard';

export const CoworksRoute: React.FC = () => {
  
  const [filteredCoworks, setFilteredCoworks] = useState([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [states, setStates] = useState<any[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');
  const [cities, setCities] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [filter, setFilter] = useState({
    location: { country: null, state: null, city: null },
    aviable: [],
    rating: [],
    capacity: [],
  });

  // //DESMARCAR CHECKBOX CUANDO SE MARCA OTRO 
  // const [selectedCheckbox, setSelectedCheckbox] = useState<string>('');
  // const [selectedCheckboxRate, setSelectedCheckboxRate] = useState<string>('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = await generateAuthToken();
        const countries = await fetchCountries(authToken);
        setCountries(countries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchData();
  }, []);

  const handleCountryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const selectedCountry = e.target.value;
      setSelectedCountry(selectedCountry);

      const authToken = await generateAuthToken();
      const states = await fetchStates(selectedCountry, authToken);
      setStates(states);

      setFilter(prevFilter => ({
        ...prevFilter,
        location: { ...prevFilter.location, country: selectedCountry },
      }));

    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const handleStateChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const selectedState = e.target.value;
      setSelectedState(selectedState);

      const authToken = await generateAuthToken();
      const cities = await fetchCities(selectedState, authToken);
      setCities(cities);

      setFilter(prevFilter => ({
        ...prevFilter,
        location: { ...prevFilter.location, state: selectedState },
      }));
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    try{
        const selectedCity = e.target.value;
        setSelectedCity(selectedCity);

        setFilter(prevFilter => ({
            ...prevFilter,
            location: { ...prevFilter.location, city: selectedCity },
          }));
    }catch(error){
        console.log('Error fetching cities:', error);
    }
  };

  const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const capacityRange = e.target.value;
    setFilter(prevFilter => {
      if (e.target.checked) {
        // Si el checkbox está marcado, agrega el valor al array
        return { ...prevFilter, capacity: [...prevFilter.capacity, capacityRange] };
      } else {
        // Si el checkbox no está marcado, elimina el valor del array
        return { ...prevFilter, capacity: prevFilter.capacity.filter(item => item !== capacityRange) };
      }
    });
  };
  
  const handleReset = ()=>{
    setFilter({
      location: { country: null, state: null, city: null },
      aviable: [],
      rating: [],
      capacity: [],
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const coworks = await getAllCoworks();
      const resultFiltered = FilterCoworks(coworks, filter);
      setFilteredCoworks(resultFiltered);
    };
    fetchData();
  }, [filter]);
  
  

  return(
    <section className="py-8 relative">
        <div className="w-full mx-auto px-4 md:px-8">

            <div className="grid grid-cols-12">
                <div className="col-span-12 md:col-span-3 w-full max-md:max-w-md max-md:mx-auto">
              <button onClick={handleReset} className="text-color-600">Reset</button>
                    <div className="box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">
                        <h6 className="font-medium text-base leading-7 text-black mb-5">Ubicacion</h6>
                        <div className="flex items-center mb-5 gap-1">
                          <div className="input-container w-full flex-col">

                            <div className="input-wrapper my-2">
                            <div
                                className="h-15 rounded-full relative group w-full bg-gray-100 overflow-hidden before:absolute before:w-14 before:h-12 before:content[''] before:right-0 before:bg-green-300 before:rounded-full before:blur-lg before:[box-shadow:-60px_20px_10px_10px_#f7fac8] border border-gray-300 border-solid"
                              >
                                <svg
                                  y="0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  x="0"
                                  width="100"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="xMidYMid meet"
                                  height="100"
                                  className="absolute right-0 -rotate-45 stroke-gray-700 top-1.5 group-hover:rotate-0 duration-300"
                                  style={{width: "3rem", height: "3rem", marginRight: ".5rem", marginTop: "1px"}}
                                >
                                  <path
                                    strokeWidth="4"
                                    stroke-linejoin="round"
                                    stroke-linecap="round"
                                    fill="none"
                                    d="M60.7,53.6,50,64.3m0,0L39.3,53.6M50,64.3V35.7m0,46.4A32.1,32.1,0,1,1,82.1,50,32.1,32.1,0,0,1,50,82.1Z"
                                    className="w-16 h-16 svg-stroke-primary"
                                  ></path>
                                </svg>
                                <select
                                  className=" appearance-none hover:placeholder-shown:bg-emerald-500 relative text-gray-600 bg-transparent ring-0 outline-none border border-neutral-500 placeholder-violet-700 font-bold focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
                                  style={{height: "4rem", fontSize: "13px", paddingLeft: "17px", borderRadius: "99px"}}
                                  id="country" onChange={handleCountryChange}
                                >
                                  <option value="">País</option>
                                  {countries.map((country, index) => (
                                    <option key={`${country.country_name}-${index}`} value={country.country_name}>{country.country_name}</option>
                                  ))}
                                  
                                </select>
                              </div>
                            </div>

                            <div className="input-wrapper my-2">
                            <div
                                className="h-15 rounded-full relative group w-full bg-gray-100 overflow-hidden before:absolute before:w-14 before:h-12 before:content[''] before:right-0 before:bg-green-300 before:rounded-full before:blur-lg before:[box-shadow:-60px_20px_10px_10px_#f7fac8] border border-gray-300 border-solid before:rotate-45"
                              >
                                <svg
                                  y="0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  x="0"
                                  width="100"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="xMidYMid meet"
                                  height="100"
                                  className="absolute right-0 -rotate-45 stroke-gray-700 top-1.5 group-hover:rotate-0 duration-300"
                                  style={{width: "3rem", height: "3rem", marginRight: ".5rem", marginTop: "1px"}}
                                >
                                  <path
                                    strokeWidth="4"
                                    stroke-linejoin="round"
                                    stroke-linecap="round"
                                    fill="none"
                                    d="M60.7,53.6,50,64.3m0,0L39.3,53.6M50,64.3V35.7m0,46.4A32.1,32.1,0,1,1,82.1,50,32.1,32.1,0,0,1,50,82.1Z"
                                    className="w-16 h-16 svg-stroke-primary"
                                  ></path>
                                </svg>
                                <select
                                  className=" appearance-none hover:placeholder-shown:bg-emerald-500 relative text-gray-600 bg-transparent ring-0 outline-none border border-neutral-500 placeholder-violet-700 font-bold focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
                                  style={{height: "4rem", fontSize: "13px", paddingLeft: "17px", borderRadius: "99px"}}
                                  id="state" onChange={handleStateChange} disabled={!selectedCountry}
                                >
                                  <option value="">Estado/provincia</option>
                                  {states.map((state, index) => (
                                    <option key={`${state.state_name}-${index}`} value={state.state_name}>{state.state_name}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="input-wrapper my-2">
                            <div
                                className="h-15 rounded-full relative group w-full bg-gray-100 overflow-hidden before:absolute before:w-14 before:h-12 before:content[''] before:right-0 before:bg-green-300 before:rounded-full before:blur-lg before:[box-shadow:-60px_20px_10px_10px_#f7fac8] border border-gray-300 border-solid before:rotate-180"
                              >
                                <svg
                                  y="0"
                                  xmlns="http://www.w3.org/2000/svg"
                                  x="0"
                                  width="100"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="xMidYMid meet"
                                  height="100"
                                  className="absolute right-0 -rotate-45 stroke-gray-700 top-1.5 group-hover:rotate-0 duration-300"
                                  style={{width: "3rem", height: "3rem", marginRight: ".5rem", marginTop: "1px"}}
                                >
                                  <path
                                    strokeWidth="4"
                                    stroke-linejoin="round"
                                    stroke-linecap="round"
                                    fill="none"
                                    d="M60.7,53.6,50,64.3m0,0L39.3,53.6M50,64.3V35.7m0,46.4A32.1,32.1,0,1,1,82.1,50,32.1,32.1,0,0,1,50,82.1Z"
                                    className="w-16 h-16 svg-stroke-primary"
                                  ></path>
                                </svg>
                                <select
                                  className=" appearance-none hover:placeholder-shown:bg-emerald-500 relative text-gray-600 bg-transparent ring-0 outline-none border border-neutral-500 placeholder-violet-700 font-bold focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
                                  style={{height: "4rem", fontSize: "13px", paddingLeft: "17px", borderRadius: "99px"}}
                                  id="city" onChange={handleCityChange} disabled={!selectedState}
                                >
                                  <option value="">Ciudad</option>
                                  {cities.map((city, index) => (
                                      <option key={`${city.city_name}-${index}`} value={city.city_name}>{city.city_name}</option>
                                  ))}
                                </select>
                              </div>
                            </div>


                          </div>
                        </div>

                    </div>

                    <div className="mt-7 box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">

                        <label className="font-medium text-sm leading-6 text-gray-800 mb-1">Filtrar por capacidad</label>
                        <div className="relative w-full mb-7">
                            {/* Start Checkbox */}

                            <div className="check-container">

                              <div className="checkbox-wrapper-33">
                                <label className="checkbox">
                                  <input
                                    className="checkbox__trigger visuallyhidden"
                                    type="checkbox"
                                    value="10-20"
                                    onChange={handleCapacityChange}
                                  />
                                  <span className="checkbox__symbol">
                                    <svg
                                      aria-hidden="true"
                                      className="icon-checkbox"
                                      width="28px"
                                      height="28px"
                                      viewBox="0 0 28 28"
                                      version="1"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M4 14l8 7L24 7"></path>
                                    </svg>
                                  </span>
                                  <p className="checkbox__textwrapper">10-20 Box</p>
                                </label>
                              </div>

                              <div className="checkbox-wrapper-33">
                                <label className="checkbox">
                                  <input
                                    className="checkbox__trigger visuallyhidden"
                                    type="checkbox"
                                    value="20-30"
                                    onChange={handleCapacityChange}
                                  />
                                  <span className="checkbox__symbol">
                                    <svg
                                      aria-hidden="true"
                                      className="icon-checkbox"
                                      width="28px"
                                      height="28px"
                                      viewBox="0 0 28 28"
                                      version="1"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M4 14l8 7L24 7"></path>
                                    </svg>
                                  </span>
                                  <p className="checkbox__textwrapper">20-30 Box</p>
                                </label>
                              </div>
                              <div className="checkbox-wrapper-33">
                                <label className="checkbox">
                                  <input
                                    className="checkbox__trigger visuallyhidden"
                                    type="checkbox"
                                    value="30-40"
                                    onChange={handleCapacityChange}
                                  />
                                  <span className="checkbox__symbol">
                                    <svg
                                      aria-hidden="true"
                                      className="icon-checkbox"
                                      width="28px"
                                      height="28px"
                                      viewBox="0 0 28 28"
                                      version="1"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M4 14l8 7L24 7"></path>
                                    </svg>
                                  </span>
                                  <p className="checkbox__textwrapper">30-40 Box</p>
                                </label>
                              </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-span-12 md:col-span-9">
                    <div className="container-coworks">
                        <ul className="cowork-list">
                        {
                          filteredCoworks.map((cowork)=>{
                              return(
                                <li>
                                  <CoworkCard cowork={cowork}/>
                                </li>
                              )
                          })
                        }
                        </ul>
                    </div>

                    {/* FIN DE RENDERIZADO DE COWORKS FILTRADOS */}
                </div>
            </div>

        </div>
    </section>
                                        
  )
}

export default CoworksRoute;