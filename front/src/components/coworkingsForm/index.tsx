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
import ICoworkingsErrorInfo  from "../../../utils/types/coworkingFormErrorInterface";

import { useRouter } from "next/navigation";


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

  const [coworkingInfoError, setCoworkingInfoError] = useState<ICoworkingsErrorInfo>({
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(coworkingInfo);
    try {
      await PostCoworkings(coworkingInfo);
      router.push("/");
    } catch (error) {
      console.log("hubo un error", error);
    }
  };

  useEffect (() => {
    const errors = coworkingValidation(coworkingInfo);
    setCoworkingInfoError(errors);
    console.log(errors);
  }, [coworkingInfo]);

  return (
    <>
      <form
        className="md:w-1/3 m-auto px-2 md:my-20 grid grid-cols-2 gap-4 "
        onSubmit={handleSubmit}>
        <h1 className="text-3xl text-center">Soy Coworking</h1>
        {formDataCoworkings.map(
          ({ name, label, type, placeholder, required }) => {
            return (
              <div key={name} className="flex flex-col ">
                <label className="flex gap-4 px-2" htmlFor={name}>
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  required={required}
                  className="border-2 mx-1/3 py-2"
                  onChange={handleChange}
                  value={coworkingInfo[name as keyof ICoworkingsInfo]}
                />
                <p className="text-red-500">
                  {coworkingInfoError[name as keyof ICoworkingsInfo]}
                </p>
              </div>
            );
          }
        )}
        <button
          className="bg-slate-500 text-white p-2 rounded-lg my-4"
          type="submit">
          Enviar Solicitud
        </button>
      </form>
    </>
  );
};

export default CoworkingsForm;
