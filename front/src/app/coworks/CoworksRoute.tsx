"use client"
import CoworkCard from "@/components/CoworkCard";
import "./style.css"
import React, { useState, useEffect } from 'react';
import { fetchCountries, generateAuthToken, fetchStates, fetchCities } from './api';
import getAllCoworks from "@/service/getAllCoworks";
import FilterCoworks from "@/service/FilterCoworks";

export const CoworksRoute = () => {

  // Seleccion de Paises, estados / provincia, ciudades
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
  })
  const inputNull = null;

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

  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const aviability = e.target.value;
    setFilter(prevFilter => {
      if (e.target.checked) {
        // Si el checkbox está marcado, agrega el valor al array
        return { ...prevFilter, aviable: [...prevFilter.aviable, aviability] };
      } else {
        // Si el checkbox no está marcado, elimina el valor del array
        return { ...prevFilter, aviable: prevFilter.aviable.filter(item => item !== aviability) };
      }
    });
  };
  
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rating = e.target.value;
    setFilter(prevFilter => {
      if (e.target.checked) {
        // Si el checkbox está marcado, agrega el valor al array
        return { ...prevFilter, rating: [...prevFilter.rating, rating] };
      } else {
        // Si el checkbox no está marcado, elimina el valor del array
        return { ...prevFilter, rating: prevFilter.rating.filter(item => item !== rating) };
      }
    });
  };
  

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
            <div className="flex flex-col lg:flex-row lg:items-center max-lg:gap-4 justify-between w-full">
              <ul className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12">
                  <li className="flex items-center cursor-pointer outline-none group">

                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#11aa03" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/></svg>

                      <span
                          className="font-normal text-lg leading-8 text-green-700 ml-2 mr-3 transition-all duration-500 group-hover:text-green-600">Finance</span>
                      <button
                          className="flex aspect-square h-6 rounded-full border border-green-700  items-center justify-center font-manrope font-medium text-base text-green-600  transition-all duration-500 group-hover:border-green-600 group-hover:text-green-600">8</button>

                  </li>

                  <li className="flex items-center cursor-pointer outline-none group">

                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>

                      <span
                          className="font-normal text-lg leading-8 text-black pl-2 pr-3 transition-all duration-500 group-hover:text-green-600">Management</span>
                      <span
                          className="w-6 h-6 rounded-full border border-gray-900 flex items-center justify-center font-manrope font-medium text-base text-gray-900 transition-all duration-500 group-hover:border-green-600 group-hover:text-green-600">3</span>
                  </li>

                  <li className="flex items-center cursor-pointer outline-none group">

                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>

                      <span
                          className="font-normal text-lg leading-8 text-black pl-2 pr-3 transition-all duration-500 group-hover:text-green-600">Today’s deal</span>
                      <span
                          className="w-6 h-6 rounded-full border border-gray-900 flex items-center justify-center font-manrope font-medium text-base text-gray-900 transition-all duration-500 group-hover:border-green-600 group-hover:text-green-600">1</span>
                  </li>
              </ul>
            </div>
            <svg className="my-2 w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2"
                fill="none">
                <path d="M0 1H1216" stroke="#babec4" />
            </svg>

            <div className="grid grid-cols-12">
                <div className="col-span-12 md:col-span-3 w-full max-md:max-w-md max-md:mx-auto">
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
                        <div className="flex items-center justify-between w-full pb-3 border-b border-gray-200 mb-7">
                            <p className="font-medium text-base leading-7 text-black ">Filtrar por</p>
                            <p className="font-medium text-xs text-gray-500 cursor-pointer transition-all duration-500 hover:text-green-600">
                              RESET</p>
                        </div>


                        <label className="font-medium text-sm leading-6 text-gray-800 mb-1">Disponibilidad</label>
                        <div className="relative w-full mb-7">
                            {/* Start Checkbox */}

                            <div className="check-container">

                              <div className="checkbox-wrapper-33">
                                <label className="checkbox">
                                  <input
                                    className="checkbox__trigger visuallyhidden"
                                    type="checkbox"
                                    value="all"
                                    onChange={handleAvailabilityChange}
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
                                  <p className="checkbox__textwrapper">Todos</p>
                                </label>
                              </div>

                              <div className="checkbox-wrapper-33">
                                <label className="checkbox">
                                  <input
                                    className="checkbox__trigger visuallyhidden"
                                    type="checkbox"
                                    value="aviable"
                                    onChange={handleAvailabilityChange}
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
                                  <p className="checkbox__textwrapper">Disponible</p>
                                </label>
                              </div>
                              <div className="checkbox-wrapper-33">
                                <label className="checkbox">
                                  <input
                                    className="checkbox__trigger visuallyhidden"
                                    type="checkbox"
                                    value="not-aviable"
                                    onChange={handleAvailabilityChange}
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
                                  <p className="checkbox__textwrapper">No disponble</p>
                                </label>
                              </div>
                            </div>
                            {/* End Checkbox */}

                        </div>
                              {/* <p className="font-medium text-sm leading-6 text-gray-800 mb-3">Filtrar por puntuacion</p> */}
                              {/*                             
                            <div className="check-container">



                                <div className="checkbox-wrapper-33">
                                  <label className="checkbox">
                                    <input 
                                    className="checkbox__trigger visuallyhidden" 
                                    type="checkbox" 
                                    value="5"
                                    onChange={handleRatingChange} 
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
                                    <span className="meta-text">
                                      <div className="rating-wrapper">
                                          <span><svg  className="rated" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                          <span><svg  className="rated" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                          <span><svg  className="rated" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                          <span><svg  className="rated" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                          <span><svg  className="rated" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                      </div>
                                      <span className="raing-text" >5.0(30)</span>
                                  </span>
                                  </label>
                                </div>


                                <div className="checkbox-wrapper-33">
                                <label className="checkbox">
                                  <input 
                                  className="checkbox__trigger visuallyhidden" 
                                  value="4"
                                  type="checkbox" onChange={handleRatingChange} 
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
                                  <span className="meta-text">
                                    <div className="rating-wrapper">
                                        <span><svg  className="rated" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                        <span><svg  className="rated" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                        <span><svg  className="rated" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                        <span><svg  className="rated" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                        <span><svg  className="" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                    </div>
                                    <span className="raing-text" >5.0(30)</span>
                                </span>
                                </label>
                                </div>


                                
                                <div className="checkbox-wrapper-33">
                                <label className="checkbox">
                                  <input 
                                  className="checkbox__trigger visuallyhidden" 
                                  type="checkbox" 
                                  value="3"
                                  onChange={handleRatingChange} 
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
                                  <span className="meta-text">
                                    <div className="rating-wrapper">
                                        <span><svg  className="rated" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                        <span><svg  className="rated" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                        <span><svg  className="rated" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                        <span><svg  className="" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                        <span><svg  className="" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                    </div>
                                    <span className="raing-text" >5.0(30)</span>
                                </span>
                                </label>
                                </div>



                                <div className="checkbox-wrapper-33">
                                <label className="checkbox">
                                  <input 
                                  className="checkbox__trigger visuallyhidden" 
                                  type="checkbox" 
                                  value="2"
                                  onChange={handleRatingChange} 
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
                                  <span className="meta-text">
                                    <div className="rating-wrapper">
                                        <span><svg  className="rated" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                        <span><svg  className="rated" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                        <span><svg  className="" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                        <span><svg  className="" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                        <span><svg  className="" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                    </div>
                                    <span className="raing-text" >5.0(30)</span>
                                </span>
                                </label>
                                </div>



                                <div className="checkbox-wrapper-33">
                                <label className="checkbox">
                                  <input 
                                  className="checkbox__trigger visuallyhidden" 
                                  type="checkbox" onChange={handleRatingChange} 
                                  value="1"
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
                                  <span className="meta-text">
                                    <div className="rating-wrapper">
                                        <span><svg  className="rated" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                        <span><svg  className="" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                        <span><svg  className="" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                        <span><svg  className="" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                        <span><svg  className="" viewBox="0 0 24 24" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></span>
                                    </div>
                                    <span className="raing-text" >5.0(30)</span>
                                </span>
                                </label>
                                </div>
                            </div>
                             */}
                    </div>
                </div>
                <div className="col-span-12 md:col-span-9">
                    {/* INICIO DE RENDERIZADO DE COWORKS FILTRADOS */}

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