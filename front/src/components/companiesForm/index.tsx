"use client";

import { formDataCompanies } from "../../../utils/arraysforms/companysForm";
import { useState } from "react";
import ICompaniesInfo from "../../../utils/types/companiesFormInterface";
import PostCompany from "../../../utils/posts/postCompany";

const CompaniesForm = () => {
  const [companiesInfo, setCompaniesInfo] = useState<ICompaniesInfo>({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    identification: "",
    position: "",
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    quantityBeneficiaries: 0,
    businessSector: "",
    size: 0,
    message: "",
    status: "pending",
    observation: "Esto es una observacion",
    type: "",
  });
  const [companiesInfoError, setCompaniesInfoError] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    identification: "",
    role: "",
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    quantityBeneficiaries: "",
    businessSector: "",
    size: "",
    message: "",
    type: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setCompaniesInfo({
      ...companiesInfo,
      [name]: value,
    });
    console.log(companiesInfo);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log(companiesInfo);

    try {
      await PostCompany(companiesInfo);
    } catch (error) {
      console.log("Hubo un error en la petición", error);
    }
  };

  return (
    <>
      <form
        className="md:w-1/3 m-auto px-2 md:my-20 grid grid-cols-2 gap-4 "
        onSubmit={handleSubmit}>
        <h1 className="text-3xl text-center col-start-2">Soy una Empresa</h1>
        {formDataCompanies.map(
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
                  value={companiesInfo[name as keyof ICompaniesInfo]}

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
