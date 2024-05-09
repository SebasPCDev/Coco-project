"use client";
// impotamos el array que mapearemos para crear los inputs y los labels del formulario
import { formDataCompanies } from "../../../utils/arraysforms/companysForm";

// importamos los hooks
import { useState, useEffect } from "react";

// importamos la interface para tipar el estado del formulario
import ICompaniesInfo from "../../../utils/types/companiesFormInterface";

// importamos la petición post a requests/company
import PostCompany from "../../../utils/posts/postCompany";

// importamos la validacion de formularios
import companyValidation from "../../../utils/formValidation/companyValidation";
import ICompaniesErrorInfo from "../../../utils/types/companiesFormErrorInterface";

import { useRouter } from "next/navigation";

const CompaniesForm = () => {
  const router = useRouter();
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

  //el estado para los errores aun no se sta utilizando
  const [companiesInfoError, setCompaniesInfoError] = useState<ICompaniesErrorInfo>({
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
      router.push("/");
    } catch (error) {
      console.log("Hubo un error en la petición", error);
    }
  };

  useEffect (() => {
    const errors = companyValidation(companiesInfo);
    setCompaniesInfoError(errors);
    console.log(errors);
  }, [companiesInfo]);


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
                />
                <p className="text-red-500">
                  {companiesInfoError[name as keyof ICompaniesInfo]}
                </p>
              </div>
            );
          }
        )}
        <button
          className="bg-slate-500 text-white p-2 rounded-lg my-4"
          type="submit">
          enviar Solicitud
        </button>
      </form>
    </>
  );
};

export default CompaniesForm;
