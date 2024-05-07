"use client";
import { companiesFormsArray } from "../../../utils/arraysforms/companysForm";
import { useState } from "react";

const CompaniesForm = () => {
  const [companiesInfo, setCompaniesInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    message: "",
    socialMedia: "",
    number_beneficiaries: 0,
    sector: "",
  });
  const [companiesInfoError, setCompaniesInfoError] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    message: "",
    socialMedia: "",
    number_beneficiaries: 0,
    sector: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompaniesInfo({ ...companiesInfo, [name]: value });
  };

  return (
    <>
      <form className="md:w-1/3 m-auto px-2 md:my-20 ">
        <h1 className="text-3xl text-center">LOGIN</h1>
        {companiesFormsArray.map(
          ({ name, label, type, placeholder, required, icon }) => {
            return (
              <div key={name} className="flex flex-col ">
                <label className="flex gap-4 px-2" htmlFor={name}>
                  {icon}
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  required={required}
                  className="border-2 mx-1/3 py-2"
                  onChange={handleChange}
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

export default CompaniesForm;