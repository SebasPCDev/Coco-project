"use client";
// impotamos el array que mapearemos para crear los inputs y los labels del formulario
import { formDataCoworkings } from "../../../utils/arraysforms/coworkingsForms";
// importamos los hooks
import { useState, useEffect } from "react";

// importamos la interface para tipar el estado del formulario
import ICoworkingsInfo from "../../../utils/types/coworkingsFormInterface";

// importamos la petición post a requests/coworking
import PostCoworkings from "../../../utils/posts/postCoworkings";

// importamos la validacion de formularios
import coworkingValidation from "../../../utils/formValidation/coworkingValidation";
import ICoworkingsErrorInfo from "../../../utils/types/coworkingFormErrorInterface";
import Swal from "sweetalert2";
import IntlTelInputComponent from "@/components/intelTeléfono";

import { useRouter } from "next/navigation";
import { PhoneInput } from "react-international-phone";
import 'react-international-phone/style.css'; 


const CoworkingsForm = () => {
  const router = useRouter();
  const [coworkingInfo, setCoworkingInfo] = useState<ICoworkingsInfo>({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    identification: "",
    position: "",
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    address: "",
    website: "",
    open: "",
    close: "",
    capacity: 0,
    status: "pending",
    observation: "Esto es una observacion",
    message: "",
    type: "",
  });

  const [coworkingInfoError, setCoworkingInfoError] =
    useState<ICoworkingsErrorInfo>({
      name: "",
      lastname: "",
      phone: "",
      email: "",
      identification: "",
      position: "",
      companyName: "",
      companyEmail: "",
      companyPhone: "",
      address: "",
      website: "",
      open: "",
      close: "",
      capacity: "",
      status: "pending",
      observation: "Esto es una observacion",
      message: "",
      type: "",
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCoworkingInfo({
      ...coworkingInfo,
      [name]: value,
    });

    console.log(coworkingInfo);
  };

  const handleChangeTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setCoworkingInfo({
      ...coworkingInfo,
      [name]: value,
    });

    console.log(coworkingInfo);
  };

  const handleChangePhone = (name: string, value: string) => {
    setCoworkingInfo({
      ...coworkingInfo,
      [name]: value,
    });
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(coworkingInfo);
    try {
      const response = await PostCoworkings(coworkingInfo);
      Swal.fire({
        title: response.responseCowork,
        text: "la respuesta se enviara a tu correo electronico",
        icon: "success",
      });
      router.push("/");
    } catch (error) {
      console.log("hubo un error", error);
    }
  };

  useEffect(() => {
    const errors = coworkingValidation(coworkingInfo);
    setCoworkingInfoError(errors);
    console.log(errors);
  }, [coworkingInfo]);

  //* Generador de horas cada 30 minutos con el horario establecido *****************
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 6; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        options.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return options;
  };

  return (
    <>
      <form
        className="max-w-4xl mx-auto p-8 rounded-lg shadow-lg bg-white"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold text-center mb-8 col-span-2">
          Soy Coworking
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formDataCoworkings.map(
            ({ name, label, type, placeholder, required }) => (
              <div
                key={name}
                className={`flex flex-col ${
                  name === "message" ? "md:col-span-2" : ""
                }`}
              >
                <label
                  htmlFor={name}
                  className="block text-gray-700 font-bold mb-2 text-lg"
                >
                  {label}
                </label>
                
                {name === "open" || name === "close" ? (
                  <div className="relative">
                    <select
                      name={name}
                      required={required}
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-6 px-8 rounded-lg text-xl leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      onChange={handleChangeTime}
                      value={coworkingInfo[name as keyof ICoworkingsInfo]}
                    >
                      <option value="">Selecciona una hora</option>
                      {generateTimeOptions().map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                ) : (name === "phone" || name === "companyPhone") ? (
                  <PhoneInput                    
                    defaultCountry="ar"
                    name={name}
                    value={coworkingInfo[name as keyof ICoworkingsInfo].toString()}
                    onChange= { (phone) => {handleChangePhone(name, phone)}}
                  />
                ) : (
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    required={required}
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-6 px-8 rounded-lg text-xl leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    onChange={handleChange}
                    value={coworkingInfo[name as keyof ICoworkingsInfo]}
                  />
                )}
                <p className="text-red-500 mt-2 text-lg">
                  {coworkingInfoError[name as keyof ICoworkingsInfo]}
                </p>
              </div>
            )
          )}
        </div>
        <button
          className="w-full bg-lime-400 hover:bg-lime-500 text-white font-bold py-4 px-8 rounded-lg text-xl focus:outline-none focus:shadow-outline mt-8"
          type="submit"
        >
          Enviar Solicitud
        </button>
      </form>
    </>
  );
};

export default CoworkingsForm;