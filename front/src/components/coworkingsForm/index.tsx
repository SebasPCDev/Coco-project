"use client";
import { useState } from "react";
import { formDataCoworkings } from "../../../utils/arraysforms/coworkingsForms";
import ICoworkingsInfo from "../../../utils/types/coworkingsFormInterface";
import PostCoworkings from "../../../utils/posts/postCoworkings";

const CoworkingsForm = () => {
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
    } catch (error) {
      console.log("hubo un error", error);
    }
  };

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
