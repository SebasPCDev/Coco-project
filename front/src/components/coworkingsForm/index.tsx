"use client";
import { useState } from "react";
import { formDataCoworkings } from "../../../utils/arraysforms/coworkingsForms";
import ICoworkingsInfo from "../../../utils/types/coworkingsFormInterface";

const CoworkingsForm = () => {
  const [coworkingInfo, setCoworkingInfo] = useState<ICoworkingsInfo>({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    identification: "",
    role: "",
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    address: "",
    website: "",
    open: "",
    close: "",
    capacity: 0,
    message: "",
    type: "Coworking",
  });

  const [coworkingInfoError, setCoworkingInfoError] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    identification: "",
    role: "",
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    address: "",
    website: "",
    open: "",
    close: "",
    capacity: "",
    message: "",
    type: "",
  });

  return (
    <>
      <form className="md:w-1/3 m-auto px-2 md:my-20 grid grid-cols-2 gap-4 ">
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

                  //   value={companiesInfo[name as keyof companiesInfo]}
                />
                <p className="text-red-500">
                  {/* {LoginFormError[name as keyof LoginFormError]} */}
                </p>
              </div>
            );
          }
        )}
        <button
          className="bg-slate-500 text-white p-2 rounded-lg my-4"
          type="submit">
          Login
        </button>
      </form>
    </>
  );
};

export default CoworkingsForm;
